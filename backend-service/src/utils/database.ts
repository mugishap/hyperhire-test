import { config } from "dotenv"
import mongoose from "mongoose"

config()

const DATABASE_URL = process.env.DATABASE_URL
export const connectDB = async () => {

    mongoose.set('strictQuery', true)
    await mongoose.connect(DATABASE_URL, {
        dbName: "hyperhire-assessment",
    }).then(() => {
        console.log("[LOG]:Database connection successful");
    }).catch((error) => {
        console.log("[ERROR]:Database connection failed");
        throw new Error("Failed to connect to database");
    })
}