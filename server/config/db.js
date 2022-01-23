import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
    const url = 'mongodb://localhost:27017/videos'
    try {
        await mongoose.connect(url || process.nv.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log("connected to  db")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;