import { asynchandler,ApiError } from "../utils/asynchandler.js"
import { loginuser } from "../contollers/user.controller.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
export const verfyauth=asynchandler(async(req,res,next)=>{
    try{
        const token=req.cookie?.accessToken || req.header
        ("Authorization")?.replace("Bearer","")
     if(!token){
        throw new ApiError(401,"something went wrong while accessing the token ")
     }
     const decodetoken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     if(!decodetoken){
        throw new ApiError(500,"access token not decoded");
     }
         const user= await User.findById(decodetoken?._id).select("-password -refreshToken")
     if(!user){
    //   frontend dicussion 
    throw new ApiError(401,"invalid token");
     }
     req.user=user;
     next();
     console.log(req.user)  // console karun bag;
    } catch(error){
      throw new ApiError(401,"token is invalid access token")
    }

})