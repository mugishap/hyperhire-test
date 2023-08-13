import bodyParser from 'body-parser'
import { config } from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bookRouter from './src/controllers/book.controllers'
import { connectDB } from './src/utils/database'

config()
connectDB()

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(bodyParser.json({ limit: "10mb" }))
app.use("/api/v1/book", bookRouter)
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})