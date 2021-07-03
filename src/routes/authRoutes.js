const express=require('express')
const mongoose=require('mongoose')
const User=mongoose.model('User')
const jwt=require('jsonwebtoken')

const router=express.Router()

router.post('/signup', async (req,res)=>{
    const {email,password} = req.body
    console.log({email,password})
    try {
        var user=new User({email,password})
       
        await user.save()
       const token =jwt.sign({userId:user._id},'MY_SECRET_KEY')
       console.log({token})
        res.send({token})
    } catch (err) {
      return res.status(422).send(err.message)  
    }
})
router.post('/signin', async (req,res)=>{
    const {email,password} = req.body
       if(!email || !password){
           return res.status(422).send({error:'email ve password girmek zorunludur.'})
       }
       const user=await User.findOne({email})
       if(!user){
        return res.status(422).send({error:'Böyle bir kullanıcı bulunamadı.'})
       }
    try {
        await user.comparePassword(password)
        const token=jwt.sign({userId:user._id},'MY_SECRET_KEY')
        res.send({token})
    } catch (err) {
      return res.status(422).send({error:'Böyle bir kullanıcı bulunamadı.'})  
    }
})

module.exports=router