const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'Post',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,  
        require:true,
        ref: 'users',
    },
    description: {
        type: String,
        require:true,
        min:3,
        max:100
    },
    timestamp:{
        type:Date,
        default:Date.now(),
    }
})

module.exports = mongoose.model('comments', commentSchema)
