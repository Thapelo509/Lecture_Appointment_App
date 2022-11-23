const express = require('express')
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const dbConfig = require('./config/dbConfig');
app.use(express.json());

const path = require('path');



const userRoute = require("./routes/userRoute");
app.use('/api/user', userRoute);

const port = process.env.PORT || 3050
   

app.get('/', (req, res) => {
  res.send('Hello World!T')
})

console.log(process.env.MONGO_URL)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})