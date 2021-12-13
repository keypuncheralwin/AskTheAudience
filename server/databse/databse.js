const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/AskTheAudience'), () => {
    console.log('connected to mongodb database')
}

module.exports = mongoose