import express from "express"
import mongoose from "mongoose"
import connectDB from "./config/connectDB"

const dotenv = require("dotenv").config()

const port = process.env.PORT || 5000

const app = express()

connectDB()

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
