const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const port = 5000
const bodyParser = require('body-parser')
const cors = require('cors')

const routesUrls = require('./routes')

dotenv.config()
mongoose.connect(
  process.env.DATABASE_ACCESS,
  { useNewUrlParse: true, useUnifiedTopology: true },
  () => console.log('Database Connected')
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routesUrls)
app.use(cors())

app.listen(port, () => console.log(`Server started at port ${port}`))
