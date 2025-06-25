import {v2 as cloudinary  }from 'cloudinary';
import fs from "fs";
// import cloudinary from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });

     const uploadclodinary=async(localFilePath)=>{
        try{
            if(!localFilePath) return null

          const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
           })
           
                 fs.unlinkSync(localFilePath)
            return response;
        }catch(error){
            if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
        }
    }

    export {uploadclodinary}