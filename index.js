import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bookrouter from "./routes/book.route.js"
import userRouter from "./routes/user.route.js"
const app = express()

app.use(express.json())

dotenv.config()

const PORT = process.env.PORT || 4001;
const mongoDBURL = process.env.MongoDBURL;

// connecting mongoDB
try {
        mongoose.connect(mongoDBURL)
        console.log("connected to mongodb")
    } catch (error) {
        console.log("Error",error)
    }

// Difring routes
app.use('/books', bookrouter)
app.use("/user",userRouter)


app.listen(PORT,()=>{
    console.log(`Server is running port number ${PORT}`)
})