import express, { Express } from "express"
import mongoose from "mongoose"
import path from "node:path"
import connectDB from "./config/connectDB"
import errorHandler from "./middleware/errorHandler"
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"
import stripeRoutes from "./routes/stripeRoutes"
import testRoutes from "./routes/testRoutes"
import populateDB from "./config/populateDB"

require("dotenv").config()
const port = process.env.PORT || 5000
const cors = require("cors")

const app: Express = express()

// EXPRESS SETUP
app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use(express.urlencoded({ extended: true }))

// APP ROUTES
app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/checkout", stripeRoutes)
app.use("/test", testRoutes)

// Serve the static files from the public directory.
const publicPath: string = path.join(__dirname, "public")
app.use(express.static(publicPath))

// Attempts to connect to MongoDB. MONGO_URI must be specified in an .env file!
connectDB(process.env.MONGO_URI)

/*
	Uncomment the function below to populate the Mongo Database.
	It can be used after database modification, deletion of products or
	after creating a brand new database with no products.
*/
// populateDB()

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
