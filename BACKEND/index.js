const connectToMongo = require('./db');
const express = require('express')
const cors=require( 'cors' )

connectToMongo();
const app = express()
app.use(cors())
const port = 3000

app.use(express.json())

//available routes

app.use('/api/auth',require('./routes/auth'))

app.use('/api/subject',require('./routes/subject'))
  
app.use('/api/slot',require('./routes/slot'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
