const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const Users = require('../models/users')
require('dotenv').config({path: './.env'})


const secret = process.env.SECRETKEY


//register user
router.post('/users/register', (req, res) => {
    Users.find({email: req.body.email})
        .exec()
        .then( emailCheck => {
            if(emailCheck.length >=1){
                return res.status(409).json({
                    message: "email already taken"
                })
            }else{
                Users.find({username: req.body.username})
                .exec()
                .then( usernameCheck => {
                    if(usernameCheck.length >=1){
                        return res.status(409).json({
                            message: "username already taken"
                        })
                    }else{
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if(err){
                                return res.status(500).json({
                                    error: err
                                })
                            }
                            else{
                                const user = new Users({
                                    email: req.body.email,
                                    username: req.body.username,
                                    password: hash
                                })
                                user.save()
                                    .then(result => res.sendStatus(201))
                                    .catch(err => res.status(500).json({error: err}))
                            }
                        })
                    }
                } )
            }

        })

})

//login user
router.post('/users/login', (req, res) => {
    Users.find({username: req.body.username})
        .exec()
        .then( users => {
            if(users.length < 1){
                return res.sendStatus(404);
            }
            bcrypt.compare(req.body.password, users[0].password, (err, isEqual) => {
                if(err) return res.sendStatus(401);
                if(isEqual) {

                    //create a token
                    const token = jwt.sign(
                        {
                            username: users[0].username,
                            userId: users[0]._id
                        }, secret,{expiresIn: "5hr"}
                    )
                       
                    return res
                    .cookie('token', token, { httpOnly: false }) 
                    .status(200).json({
                        message: 'Authorization Successful',
                        token: token
                    })
                } 
                res.sendStatus(401)
            })

        }).catch(err => { console.log(err); res.status(500).json({error: err})})
})



module.exports = router;