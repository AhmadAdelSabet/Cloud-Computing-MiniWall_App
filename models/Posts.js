const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        min:4,
        max:128
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
    description:{
        type:String,
        required:true,
        min:3,
        max:128
    },
    likes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('posts', postSchema)