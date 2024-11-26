import mongoose from "mongoose";
const Schema = mongoose.Schema
let Productschema =new Schema({
    name:{
        type:String ,
        required:true
    },
    description:{
        type:String ,
        required:true
    },
    date:{
        type:String,
        required: true   
    },
    uom:{
        type:String  ,
        required: true   
    },
    admin:{
        type:String  ,
        required: true   
    },


});
export default mongoose.model("productdata", Productschema)