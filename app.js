const express = require ('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv/config')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

/* sign up and log in */
const authRoute = require('./routes/auth')
app.use('/api/user', authRoute)

/* posting */
const postRoute = require('./routes/post')
app.use('/api/post', postRoute)

/* like */
const likeRoute = require('./routes/like')
app.use('/api/likes', likeRoute)

/* comment */
const commentRoute = require('./routes/comments')
app.use('/api/comments', commentRoute)

app.get('/', (req,res) => {
    res.send("Hello")
})

/* Connect to DB */
mongoose.connect(process.env.DB_CONNECTOR, () => {
    console.log('DB is now connected')
})

app.listen(3000, () => {
    console.log("Your server is running")
})

