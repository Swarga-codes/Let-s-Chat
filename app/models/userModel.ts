import mongoose from "mongoose";

let userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const USER=mongoose.models.USER || mongoose.model('USER',userSchema)

export default USER;