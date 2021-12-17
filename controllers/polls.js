const express = require('express')
const router = express();
const Polls = require('../models/polls');
const checkAuth = require('../middleware/auth')
const Mongoose = require('mongoose')
const ObjectId = Mongoose.Types.ObjectId

router.use(express.json());

router.get('/allPolls', async (req,res) => {
    
    try{
        const myPolls = await Polls.find().sort( [['_id', -1]] )
        
        res.json(myPolls)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})


router.post('/new',checkAuth, (req,res) => {
    const poll = new Polls({
        username: req.userData.username,
        title: req.body.title,
        description: req.body.description,
        options: req.body.options,
        whoVoted: req.body.whoVoted,
        comments: req.body.comments
    })
    poll.save()
    .then(result => res.sendStatus(201))
    .catch( err => {
        console.log(err);
        res.status(500).json({error: err})
    })
})

router.get('/myPolls',checkAuth, async (req,res) => {
    const username = req.userData.username
    try{
        const myPolls = await Polls.find({"username":username}).sort( [['_id', -1]] )
        
        res.json(myPolls)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.get('/poll/:id', async (req,res) => {
    const pollId = req.params.id
    try{
        const pollById = await Polls.find({"_id": ObjectId(pollId)})
        res.json(pollById[0])
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.delete('/poll/:id',checkAuth, (req,res) => {
    const pollId = req.params.id
    const username = req.userData.username
    console.log(username)
    Polls.find({"_id": ObjectId(pollId)})
        .exec()
        .then( pollCheck => {
            if(pollCheck.length > 1){ return res.status(404).json({message: "Invalid Poll"})}
                        
            if(username === pollCheck[0].username){ 

                Polls.find({"_id": ObjectId(pollId)}).deleteOne().exec().then(result =>{ res.json({message: "The poll has been deleted"}) }).catch(err => {
                    console.log(err)
                    res.json({message: err})
                })

            }else{
                return res.status(401).json({message: "You're not authorised to delete this poll"})
            } 

            
                
        }).catch(err => {
            console.log(err)
            res.json({message: err})
        })
})

router.post('/poll/vote',checkAuth, async (req,res) => {
    const username = req.userData.username
    console.log(username, '.........................')
    const pollId = req.body.pollId
    const optionIndex = req.body.optionId
    
    const whoVoted= {
        user : {'name': '', 'optionIndex': ''}
    }
    whoVoted.user['name']= username
    whoVoted.user['optionIndex'] = optionIndex

    const query = {
        "$inc": {},
        "$push": {}
    }
    query["$inc"][`options.${optionIndex}.option.votes`] = 1
    query["$push"][`whoVoted`] = whoVoted 
    
    Polls.find({"_id": ObjectId(pollId)})
        .exec()
        .then( pollCheck => {
            if(pollCheck.length > 1){ return res.status(404).json({message: "Invalid Poll"})}
            if(optionIndex > pollCheck[0].options.length){ return res.status(404).json({message: "Invalid Poll Option"})}
            if(username === pollCheck[0].username){ return res.status(401).json({message: "You can't vote on your own poll"})}
            
            const hasVoted = pollCheck[0]['whoVoted'].map(item => {if(item.user.name === username){return item.user.name}})
            console.log(hasVoted)
            // console.log(pollCheck[0]['whoVoted'].map(item => {return item[`${username}`]}))
            const userWhoVoted = []
            for (vote of hasVoted){
                if(vote === username){
                    userWhoVoted.push(vote)
                }
            }
            
            if(userWhoVoted.length > 0 ){ return res.status(404).json( {message: `You've already voted on this poll`} )}

            
            Polls.findOneAndUpdate( { "_id": ObjectId(pollId) }, query ).then( result => {
                res.json({message:"You've successfully voted"})
            }).catch(err => {console.log(err)}) 

            
            
                
        }).catch(err => {
            console.log(err)
            res.json({message: err})
        })


    
    
})

router.get('/:username', async (req,res) => {
    
    const username = req.params.username
    
    try{
        const polls = await Polls.find({"username":username}).sort( [['_id', -1]] )
        
        res.json(polls)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.post('/comment',checkAuth, async (req,res) => {
    const username = req.userData.username
    
    const pollId = req.body.pollId
    const comment = req.body.comment

    const getDate = new Date();
    const currentDate = getDate.toLocaleString()

    const addComment= {
        user : {'name': '', 'comment': '', 'date': ''}
    }
    addComment.user['name']= username
    addComment.user['comment'] = comment
    addComment.user['date'] = currentDate

    const query = {
        "$push": {}
    }
    query["$push"][`comments`] = addComment
    
    Polls.find({"_id": ObjectId(pollId)})
        .exec()
        .then( pollCheck => {
            if(pollCheck.length > 1 || pollCheck.length === 0){ return res.status(404).json({message: "Invalid Poll"})}
            
            Polls.findOneAndUpdate( { "_id": ObjectId(pollId) }, query ).then( result => {
                res.json({message:"You've successfully commented"})
            }).catch(err => {console.log(err)}) 

            
            
                
        }).catch(err => {
            console.log(err)
            res.json({message: err})
        })


    
    
})

module.exports = router;

