import mongoose from "mongoose"

const connectDB: () => Promise<void> = async () => {
    try {
        if (process.env.MONGO_URI) {
            const conn = await mongoose.connect(process.env.MONGO_URI)
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
