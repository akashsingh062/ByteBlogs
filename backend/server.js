import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from './config/cloudnary.js';
import userRouter from './routes/userRouter.js'
import blogRouter from './routes/blogRouter.js';

// config
const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

app.get('/',(req, res)=>{
    res.status(200).send("hello")
} )

app.listen(PORT, async ()=>{
    await connectDB()
    connectCloudinary()
    console.log("server is running on port : ",PORT)
})