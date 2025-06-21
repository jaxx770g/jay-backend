import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';

import connectDB from './db/indeex.js';


dotenv.config({
    path:'./env'   //second method for database connection
})
connectDB ();







/*  method 1 to connect to MongoDB
{
    async ()=>{
        try{
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error",(error)=>{
       console.log("error",error);
       throw error;
       })
       app.listen(process.env.PORT,()=>{
       console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
        catch(error){
        console.error("");
        throw error;
        }
    }
}
    */
