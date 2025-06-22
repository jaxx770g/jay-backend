
import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate_paginate-v2"
const videoSchema=new mongoose.Schema({
  videoFile:{
    type:String,
    required:true
  },
  title:{
   type:String,
   required:true
  },
  thumnail:{
   type:String,
   required:true
  },
  description:{
    type:String,
    required:true
  },
  duration:{
    type:Number,
    required:true
  },
  views:{
    type:Number,
    required:true,
  },
  isPublished:{
    type:Boolean,
    defauly:true
  },
  owner:{
    type:Schema.Type.ObjectId,
    ref:"User"
  }





},{
    timestamps:true
})
videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema)