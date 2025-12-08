const express=require('express')
const router=express.Router()
const loans=require('../models/loans')

router.get('/',async (req,res)=>{
    const data=await loans.find()
    res.send(data)
})

router.post('/add',async (req,res)=>{
    const newloan=new loans(req.body)
    const data=await newloan.save()
    res.send(data)
})

router.put('/:id',async (req,res)=>{
    const {name,email,panNumber,address}=req.body
    const data=await loans.findByIdAndUpdate(req.params.id,{name,email,panNumber,address},{new:true})
    res.send(data)
})

router.delete('/:id',async (req,res)=>{
    const data=await loans.findByIdAndDelete(req.params.id)
    res.send(data)
})

router.get('/:id',async (req,res)=>{
    const data=await loans.findById(req.params.id)
    res.send(data)
})

router.get('/compare/:months',async (req,res)=>{
   const months=req.params.months
   const data= await loans.find({loanTenure:months})
   
//     const balance=balance-pricipal
//     const R=data.intrest/(12*100)
//    const intrest=balance*R
//    const pricipal=data.emi-intrest


//    data.forEach(d => {

    
//    });

   res.send(data)
})

module.exports=router




