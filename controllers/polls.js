const express = require('express')
const router = express();
const Polls = require('../models/polls');
const checkAuth = require('../middleware/auth')
const Mongoose = require('mongoose')
const ObjectId = Mongoose.Types.ObjectId

router.use(express.json());




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

router.post('/poll/vote',checkAuth, async (req,res) => {
    const username = req.userData.username
    const pollId = req.body.pollId
    const optionIndex = req.body.optionId
    
    const whoVoted = {}
    whoVoted[`${username}`] = optionIndex
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
            
            if(username === pollCheck[0].username){ return res.status(403).json({message: "You can't vote on your own poll"})}
            Polls.findOneAndUpdate( { "_id": ObjectId(pollId) }, query ).then( result => {
                res.json("You've successfully voted")
            }) 

            if(pollCheck[0]['whoVoted'][0][`${username}`] >= 0){ 
                
                console.log("we're in")
                const index = pollCheck[0]['whoVoted'][0][`${username}`]
                const votedOption = pollCheck[0].options[index].option.name
                console.log(votedOption)
                return res.status(404).json( {message: `You've already voted on this poll, you chose --  ${votedOption}`} )}
            
                
        }
        )


    
    
})

module.exports = router;

// try{
//     const updateVote = await Polls.findOneAndUpdate(
//     {
//         "_id": ObjectId(pollId)
//     },
//     query
//     )
//     res.json('lol')
// }catch(err){
//     console.log(err)
//     res.json({message: err})
// }