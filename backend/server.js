const express = require('express')
const mongoose= require('mongoose')

const bodyparser= require('body-parser')
const cors=require('cors')

const app = express()
app.use(bodyparser.json())
app.use(cors())

const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/items')

app.use('/auth',authRoutes)
app.use('/api',itemRoutes)

mongoose.connect('your_db_url',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log('database is connected'))
.catch(err=>console.log(err))

app.listen(5000,()=>{
    console.log('Server running on port 5000');
})