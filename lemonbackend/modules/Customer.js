import mongoose from "mongoose";
const Schema = mongoose.Schema
let Customer =new Schema({
    username:{
        type:String ,
        required:true
    },
    email:{
        type:String ,
        required:true
    },
    password:{
        type:String  ,
        required: true   
    },
    phone:{
        type:String  ,
        required: true   
    }

});
export default mongoose.model("customerdata", Customer)