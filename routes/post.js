// based on minifilm lab code
// create, delete, edit, and read posts

const express = require('express')
const router = express.Router()

const Post = require('../models/Posts')
const {postVal} = require('../validations/validation')

const verify = require('../verifyToken')

router.post('/write', verify, async (req,res) => {
    const{error} = postVal(req.body)
    if(error) {return res.status(400).send({message:error['details'][0]['message']})}

    // create new post if valid
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user._id
    })
    try {
        const newPost = await post.save()
        res.send(newPost)
    } catch (err) {res.status(400).send({message:err})}
})

router.delete('/delete/:postID', verify, async (req,res) => {
    const postExists = await Post.findOne({_id: req.params.postID})
    if(!postExists) {return res.status(400).send({message: 'Post doesnt exist'})}

    if(postExists.author != req.user._id) {return res.status(400).send({message: 'Post not yours'})}

    try {
        const delPost = await Post.deleteOne({_id: req.params.postID})
        res.send(delPost)
    } catch(err) {res.status(400).send({message:err})}
})

router.patch('/edit/:postID', verify, async (req, res) => {
    const postExists = await Post.findOne({_id: req.params.postID})
    if(!postExists) {return res.status(400).send({message:'Post doesnt exist'})}

    if(postExists.author != req.user._id) {return res.status(400).send({message:'Post not yours'})}

    try {
        // new post title and description
        const editPost = await Post.updateOne(
            {_id: req.params.postID},
            {$set: 
                {title: req.body.title, 
                 description: req.body.description}}
        )
        res.send(editPost)
    } catch(err) {res.status(400).send({message:err})}
})

router.get('/allposts', verify, async (req, res) => {
    try {
        const posts = await Post.find().sort(
            {likes:-1, 
             timestamp:-1})
        res.send(posts)
    } catch(err) {res.status(400).send({message:err})}
})

module.exports = router