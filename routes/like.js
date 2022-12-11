const express = require('express')
const router = express.Router()

const Like = require('../models/Like')
const Post = require('../models/Posts')
const verify = require('../verifyToken')

router.post('/like/:postID', verify, async(req,res) => {
    const postExists = await Post.findById(req.params.postID)
    if (!postExists) {return res.status(400).send({message:"Post doesnt exist"})}

    if (postExists.author == req.user._id) {return res.status(400).send({message:"Cannot like your post"})}

const like = new Like({
    user: req.user._id,
    post: req.params.postID
})

try{
    await Post.findOneAndUpdate(
        {_id: req.params.postID}, 
        {$inc: {likes: 1}})
    const newLike = await like.save()
    res.send({newLike})
}catch(err){res.status(400).send({message:err})}
})

module.exports = router