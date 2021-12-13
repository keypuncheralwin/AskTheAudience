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

router.post('/poll/vote', checkAuth, async (req,res) => {
    const pollId = req.body.pollId
    const optionId = req.body.optionId
    console.log(pollId)
    console.log(optionId)
    try{
        const updateVote = await Polls.updateOne({
            "_id": ObjectId(pollId)},
            options[optionId] : options.votes)
        console.log(updateVote[0])
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
    
})

module.exports = router;