
const { SchemaTypes } = require('../databse/databse')
const db = require('../databse/databse')


const pollSchema = new db.Schema({
    username: {type: SchemaTypes.String, required: true},
    title: {type: SchemaTypes.String, required: true},
    description: {type: SchemaTypes.String, required: true},
    options: {type: SchemaTypes.Array, required: true},
    whoVoted: {type: SchemaTypes.Array, required: true},
    comments: {type: SchemaTypes.Array, required: true}

}, {timestamps: true})

const Polls = db.model('Polls', pollSchema)

module.exports = Polls


// {
//     "username": "testman",
//     "title": "random title",
//     "description":"random description",
//     "options": [{"1":{"name of option":0}},{"2":{"name of option":0}}],
//     "whoVoted":[{"username":"id"},{"username":"id"}]
// }