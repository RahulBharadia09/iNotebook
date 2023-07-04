// import {google} from 'googleapis'

const connectToMongo = require('./db');
// Database call

const express = require('express');
// calling express

var cors = require('cors');
// cors are used to connect middleware and use anywhere


connectToMongo(); //callling the database

// initialize of  express 
const app = express()
const port = 5000

app.use(cors())

// calling the express for parsing the json
app.use(express.json())


// Available Routes
app.use('/api/auth', require('./routes/auth')) //it mount the specified middleware function at the specified path
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`INoteBook listening on port ${port}`)
})
