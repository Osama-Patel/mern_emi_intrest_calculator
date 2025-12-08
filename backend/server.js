const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
const loansroutes=require('./controllers/loansController')

app.use(express.json())
app.use(cors())
app.use('/api/loans',loansroutes)

mongoose.connect('mongodb://localhost:27017/mydb')

app.listen(3000,()=>{
    console.log("Server is running on PORT:3000");

})