import express from "express"
import mongoose from "mongoose"
import path from "node:path"
import connectDB from "./config/connectDB"
import errorHandler from "./middleware/errorHandler"
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"
import populateDB from "./config/populateDB"
import generateNameIds from "./nameIds"
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use(express.urlencoded({ extended: true }))
app.use("/products", productRoutes)
app.use("/users", userRoutes)
const publicPath = path.join(__dirname, "public")
app.use(express.static(publicPath))

connectDB()

// WARNING: any data in the Database that is not available in ./products.ts will be deleted
// populateDB()

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
