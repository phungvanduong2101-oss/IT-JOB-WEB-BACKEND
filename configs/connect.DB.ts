import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => { 
    try { 
        const connect = await mongoose.connect(process.env.DB_URL!); 
        console.log(`Suucessfully connect to DB`); 
    } catch (error) { 
        console.log(error);
    }
}