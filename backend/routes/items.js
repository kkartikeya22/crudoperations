const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const router = express.Router()

const itemSchema = new mongoose.Schema({
    name : {type:String,required:true},
    description : {type:String,required:true}
})

const Item = mongoose.model('Item',itemSchema)

const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization.split('')[1]
    jwt.verify(token,'1234',(err,decoded)=>{
    if(err) return res.status(401).send('Unauthorized')
    req.userId=decoded.userId
    next()
    })
}

router.use(authMiddleware)


//create
router.post('/items',async(req,res)=>{
    try{
        const {name,description} = req.body
        const item =new Item({name,description})
        await item.save()
        res.status(201).send(item)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

//read
router.get('/items',async(req,res)=>{
    try{
        const items = await Item.find()
        res.status(201).send(items)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

//read
router.get('/items/:id', async (req,res)=>{
    try{
        const item= await Item.findById(req.params.id)
        res.send(item)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

//update
router.put('/items/:id',async(req,res)=>{
    try{
        const item= await Item.findByIdAndUpdate(req.params.id,req.body,{new:false})
        res.send(item)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

//delete
router.delete('/items/:id', async (req,res)=>{
    try{
        await Item.findByIdAndDelete(req.params.id)
        res.send('item is deleted')
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = router