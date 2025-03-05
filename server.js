import express from 'express'
export const app = express()
import cors from 'cors'
import router from './routes/router.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

mongoose.connect(process.env.DB_URL)
const conn = mongoose.connection
conn.on("error", (error)=> console.log(error))
conn.once("open", ()=> console.log("Connected to database"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api',router)
