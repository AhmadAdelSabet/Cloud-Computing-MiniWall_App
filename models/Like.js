// like schema, defines info that like should contain
// borrowed from minifilm and minipost

const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

module.exports = mongoose.model('Like', LikeSchema)