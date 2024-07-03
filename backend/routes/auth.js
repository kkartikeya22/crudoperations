const express = require('express')
const jwt = require('jsonwebtoken')
const bcrytp = require('bcryptjs')
const User = require('../models/User')

const router= express.Router()

router.post('/register',async(req,res)=>{
    try{
        const {username,password}= req.body
        const user= new User({username,password})
        await user.save()
        res.status(201).send('User registered')
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

// create read update delete
// crud

router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const user = await User.findOne({username})
        if(!user || !await bcrytp.compare(password,user.password)){
            return res.status(400).send('Invalid credentials')
        }
        const token = jwt.sign({userId:user._id},'1234')
        res.send({token})
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports= router