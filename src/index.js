import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';

import connectDB from './db/indeex.js';
 import express from 'express';
import { app } from './app.js';

dotenv.config({
    path:'./.env'   //second method for database connection
})
connectDB ()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);

    })
})
.catch((error)=>{
    console.log("Error connecting to MongoDB:", error);
  // Exit the process with failure
})







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
