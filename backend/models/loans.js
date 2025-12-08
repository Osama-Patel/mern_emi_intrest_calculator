const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:String,
    email:String,
    panNumber:String,
    address:String,
    loanAmount:Number,
    intrestRate:Number,
    loanTenure:Number,
    emi:Number,
    totalIntrest:Number,
    totalPayment:Number
})

module.exports=mongoose.model("loan",schema)