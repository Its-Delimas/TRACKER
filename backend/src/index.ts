import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import sessionRoutes from './routes/sessionRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    origin:"https://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/sessions',sessionRoutes)

app.get('/',(req,res)=>{
    res.json({message:"Dev Tracker API Running"})
})

mongoose.connect(process.env.DATABASE_URL!)
    .then(()=>{
        console.log('Connected to MongoDb Atlas')
        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err)=>{
        console.log('MongoDB connection Failed:',err)
        process.exit(1)
    })
