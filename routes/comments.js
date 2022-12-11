// based on minifilm lab code
// create, delete, edit, and read comments

const express = require('express')
const router = express.Router()
const Post = require('../models/Posts')
const Comment = require('../models/Comment')
const {commentVal} = require('../validations/validation')

const verify = require('../verifyToken')

router.post('/write/:postID', verify, async (req, res) => {
    const postExists = await Post.findOne({_id: req.params.postID})
    if(!postExists) {return res.status(400).send({message:'Post doesnt exist'})}

    if(postExists.author == req.user._id) {return res.status(400).send({message:'Cannot comment on your own post'})}

    const {error} = commentVal(req.body)
    if(error) {return res.status(400).send({message:error['details'][0]['message']})}

    // create new comment
    const comment = new Comment({
        post: req.params.postID,
        author: req.user._id,
        description: req.body.description,
    })
    try {
        const makeComment = await comment.save()
        res.send(makeComment)
    } catch(err) {res.status(400).send({message:err})}
})

router.patch('/edit/:commentID', verify, async (req, res) => {
    const commentExists = await Comment.findOne({_id: req.params.commentID})
    if(!commentExists) {return res.status(400).send({message:'Comment doesnt exist'})}

    if(commentExists.author != req.user._id) {return res.status(400).send({message:'Cannot delete this comment.'})}

    try {
        const newComment = await Comment.updateOne(
            {_id: req.params.commentID},
            {$set: {description: req.body.description}}
        )
        res.send(newComment)
    } catch(err) {res.status(400).send({message:err})}
})

router.delete('/delete/:commentID', verify, async (req, res) => {
    const commentExists = await Comment.findOne({_id: req.params.commentID})
    if(!commentExists){return res.status(400).send({message:'Comment doesnt exist'})}

    if(commentExists.author != req.user._id) {return res.status(400).send({message:'Cant delete comment that is not yours'})}

    try {
        const delComment = await Comment.deleteOne(
            {_id: req.params.commentID})
        res.send(delComment)
    } catch(err) {res.status(400).send({message:err})}
})

router.get('/seecomments/:postID', verify, async (req, res) => {
    const postExists = await Post.findOne({_id: req.params.postID})
    if(!postExists) {return res.status(400).send({message:'Post doesnt exist'})}

    try {
        const comments = await Comment.find(
            {post: req.params.postID})
        res.send(comments)
    } catch(err) {res.status(400).send({message:err})}
})

module.exports = router