import mongoose from "mongoose"
import { baseAsyncFn } from "../types/Functions"

type fnType = (URI: string | undefined) => Promise<void>

const connectDB: baseAsyncFn = async (URI: string | undefined) => {
	try {
		// Check if URI is given and if it is a string. If yes, attempt to connect.
		if (URI) {
			const conn = await mongoose.connect(URI)
			console.log(`MongoDB connected: ${conn.connection.host}`)
		} else {
			throw new Error("No Mongo URI found!")
		}
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

export default connectDB
