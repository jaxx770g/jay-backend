import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const  connectDB=async()=>{
    try{
       const connectexitanxe= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB connected: ${connectexitanxe.connection.host}`);
    }catch(error){
        console.log("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure

    }
}
export default connectDB;