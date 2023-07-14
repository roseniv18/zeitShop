import express from "express"
import mongoose from "mongoose"
import path from "node:path"
import connectDB from "./config/connectDB"
import errorHandler from "./middleware/errorHandler"
import productRoutes from "./routes/productRoutes"
import populateDB from "./config/populateDB"
import nameIds from "./nameIds"
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/products", productRoutes)
app.use(errorHandler)
const publicPath = path.join(__dirname, "public")
app.use(express.static(publicPath))
console.log(publicPath)

connectDB()

// populateDB()
// console.log(nameIds)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
