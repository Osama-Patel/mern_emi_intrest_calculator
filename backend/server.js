const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const loansroutes=require('./controllers/loansController')

const dotenv=require('dotenv')
dotenv.config()
const app=express()

app.use(express.json())
app.use(cors())
app.use('/api/loans',loansroutes)

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB connected"))

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})