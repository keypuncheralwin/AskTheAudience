
const { SchemaTypes } = require('../databse/databse')
const db = require('../databse/databse')


const userSchema = new db.Schema({
    email: {type: SchemaTypes.String, required: true},
    username: {type: SchemaTypes.String, required: true},    
    password: {type: SchemaTypes.String, required: true},

}, {timestamps: true})

const Users = db.model('Users', userSchema)

module.exports = Users