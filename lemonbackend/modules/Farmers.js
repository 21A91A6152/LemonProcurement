import mongoose from "mongoose";
const Schema = mongoose.Schema
let Farmerschema =new Schema({
    farmerName: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type:String  ,
        required: true   
    },
    village:{
        type:String ,
        required:true
    },
    city:{
        type:String  ,
        required: true   
    },
    state:{
        type:String  ,
        required: true   
    },
    country:{
        type:String  ,
        required: true   
    },
    pincode:{
        type:String  ,
        required: true   
    },
    admin:{
        type:String  ,
        required: true   
    },
    

});
export default mongoose.model("farmerdata", Farmerschema)