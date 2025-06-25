
import { asynchandler} from '../utils/asynchandler.js'
import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadclodinary } from '../utils/cloudinary.js';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
const registerUser=asynchandler(async(req,res)=>{
    const {username,email,password,fullname}=req.body;
    console.log("email:",email);
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const userpasscheck= await User.findOne({
        $or :[{username},{email}]
    })

    if(userpasscheck){
        throw new ApiError(404, "passord or email already exist")
    }
     const avatarpath=req.files?.avatar[0]?.path;
     console.log(req.files)
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length > 0) {
        coverImageLocalPath = req.files.coverimage[0].path
    }
    // const coverImagepath=req.files?.coverImage[0]?.path
  console.log(coverImageLocalPath);
console.log(avatarpath);
     if(!avatarpath){
        throw new ApiError(404, "passord333or email already exist")
     }
    
      const avatar= await uploadclodinary(avatarpath);
     
if (!avatar) {
  throw new ApiError(500, "Avatar upload failed");
}

let coverimage = { url: "" };
if (coverImageLocalPath) {
  coverimage = await uploadclodinary(coverImageLocalPath);
  if (!coverimage) {
    throw new ApiError(500, "Cover image upload failed");
  }
}
    const user=await User.create({
            fullname,
            username:username.toLowerCase(),
          password,
           avatar:avatar.url,
            coverimage:coverimage.url||"",
               email,
        })
        const createuser=await User.findById(user._id).select("-password -refreshToken")
  
        if(!createuser){
            throw new ApiError(500,"something went wrong while user  not created");
        }
   return res.status(201).json(
    new ApiResponse( 200,createuser,"user created successfully")
     
   )
   
}
)
const generateaccresstokenandrefreshtoken=async(userid)=>{
try{
    const user=await User.findById(userid)
    console.log(user);
    const accessToken=user.generateAccessToken();
    const refreshToken=user.generateRefreshToken();
      user.refreshToken=refreshToken;
      
      await user.save({validateBeforeSave:false})
      return {accessToken,refreshToken};
}catch(error){
  throw new ApiError(500, "token not generated somethong ewent rong wile generating token")
}
}
const loginuser=asynchandler(async(req,res)=>{
      const {fullname,email,username,password}=req.body;
      if(!username || !email){
        throw new ApiError(400, "username or email is require")
      }
      const user=await User.findOne({
        $or:[{username},{email}]
      })
      if(!user){
        throw new ApiError(401,"invalid username or email")
      }
      const passwordcheck=await ispasswordcomapre(password)
      if(!passwordcheck){
        throw new ApiError(401,"INvalid credential")
      }
      const {accessToken,refreshToken}=await generateaccresstokenandrefreshtoken(user._id);
      const createloginuser=await User.findOne(user._id).select("-password -refreshToken")
      if(!createloginuser){
        throw new ApiError(500,"something went wrong")
      }
      const options={
         httponly:true,
         secure:true
      }
      return res
      .status(201)
      .json( new ApiResponse(200,
        {
         user:createloginuser,refreshToken,accessToken
        },
          "user loginin successfully"
      ))
      .cookie("accessToken",accessToken,options)
       .cookie("refreshToken",refreshToken,options)
       
})


const logoutuser=asynchandler(async(req,res)=>{
   await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken:undefined
            }
        }
    )
    const options={
        httponly:true,
        secure:true
    }
    return res.status(200).clearcookie("accessToken",options)
    .clearcookie("refreshToken",options)
    .json( new ApiResponse(200,{},"user logout sucessfully"))

    
})
export {registerUser,loginuser,logoutuser}