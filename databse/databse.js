const mongoose = require('mongoose')
require('dotenv').config({path: './.env'})

const URI = process.env.MONGO_URI

mongoose.connect(URI), () => {
    console.log('connected to mongodb database')
}

module.exports = mongoose