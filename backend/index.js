import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import urlRouter from "./routers/urlRouter.js"

const app = express()
dotenv.config()
const PORT = 8000

app.use(cors())
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use("/", urlRouter)

mongoose.set("strictQuery", true);
app.listen(PORT, ()=> {
    mongoose.connect(`${process.env.DB_CONNECTION}`)
    .then(()=> console.log("connected to db"))
    .catch((err)=> console.log(err))
})