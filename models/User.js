// user schema, defines what user should look like and contain
// borrowed from minifilm and minipost

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require:true,
        min:3,
        max:30
    },
    email: {
        type: String,
        require:true,
        min: 6,
        max: 37
    },
    password: {
        type:String,
        require:true,
        min:4,
        max:27
    }
})

module.exports = mongoose.model('users', userSchema)