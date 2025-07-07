import mongoose, { model, mongo } from "mongoose";

const appliSchema=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true

    },
    applicants:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['accepted','pending','rejected'],
        default:'pending'
    }




},{timestamps:true});
export default Application=mongoose.model('Application',appliSchema)