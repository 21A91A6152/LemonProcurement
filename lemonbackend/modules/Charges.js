import mongoose from "mongoose";
const Schema = mongoose.Schema
let Chargeschema =new Schema({
    type:{
        type:String ,
        required:true
    },
    code:{
        type:String ,
        required:true
    },
    value:{
        type:String  ,
        required: true   
    },
    admin:{
        type:String,
        required:true
    },
     

});
export default mongoose.model("chargesdata", Chargeschema)