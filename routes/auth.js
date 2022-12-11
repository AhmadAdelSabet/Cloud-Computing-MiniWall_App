// based on minifilm app code
// has registration and login steps
// checks if user exists, user meets conditions to register or sign up, etc.

const express = require('express')
const router = express.Router()
const User = require('../models/User')

/* for storing passwords */
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

/* get registration and login rules from validation.js */
const {registerVal, loginVal} = require('../validations/validation') 

router.post('/signup', async (req,res) => {
    const userExist = await User.findOne({email: req.body.email})
    if(userExist) {return res.status(400).send({message: 'Not now'})}
    
    const {error} = registerVal(req.body)
    if (error) {return res.status(400).send({message:error['details'][0]['message']})}

    const salt = await bcryptjs.genSalt(5)
    const hashedPwd = await bcryptjs.hash(req.body.password, salt)

    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPwd
    })
    try {
        const makeUser = await user.save()
        res.send(makeUser)
    } catch(err) {res.status(400).send({message:err})}
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user) {return res.status(400).send({message: 'Not now'})}

    const {error} = loginVal(req.body)
    if(error) {return res.status(400).send({message:error['details'][0]['message']})}

    const validPassword = await bcryptjs.compare(req.body.password, user.password)
    if (!validPassword){return res.status(400).send({message:'Wrong password, try again'})}

    const token = jsonwebtoken.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({'auth-token':token})
})

module.exports = router