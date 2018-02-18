const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.error)

const mongoUrl = 'mongodb://fullstack:sekred@ds113915.mlab.com:13915/fullblogilista'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})