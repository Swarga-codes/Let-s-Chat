import mongoose from "mongoose";

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"
    }
},{
    timestamps:true
})

const USER=mongoose.models.USER || mongoose.model('USER',userSchema)

export default USER;