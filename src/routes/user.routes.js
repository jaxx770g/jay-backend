import { upload } from "../middlewares/multter.middleware.js";
import express from "express";
import { registerUser,loginuser,logoutuser } from "../contollers/user.controller.js";
const router=express.Router()
router.route("/register").post(  
    upload.fields([
        {
          name:"avatar",
          maxCount:1
},{
    name:"coverimage",
    maxCount:1
}
]),registerUser);
router.route("/login").post(loginuser);
router.route("/logout").post(logoutuser)


export  {router}