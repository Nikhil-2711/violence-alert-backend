const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const port=4000
const routes=require('./routes/routes')
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())

app.use('/api',routes)

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB connected");
    
}).catch((e)=>{
    console.log("Error in DB connection:",e);
    
})

app.listen(port,()=>{
    console.log(`Server listening to port ${port}`);
    
})