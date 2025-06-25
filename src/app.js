import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


/// pending some code in this file 
app.use(express.json({limit: "10MB"}))
app.use(express.urlencoded({extended: true, limit: "10MB"}))
app.use(express.static("public"))
app.use(cookieParser())

// ROUTES
import  {router} from "./routes/user.routes.js"



// rotes declareation
app.use("/api/v1/users",router)
export{app};