const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

const app = express();
connectToMongo();


app.use(cors())
const port = 5000
// use middle ware to request in body
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))
// app.get('/', (req, res) => {
//   res.send('Hello Muhammad Ali!')
// })
// app.get('/api/v1/login', (req, res)=>{
//     res.send('Hello Login')

// })
// app.get('/api/v1/signup', (req, res)=>{
//     res.send('Hello signup')

// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
