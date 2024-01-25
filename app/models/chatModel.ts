import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema.Types;
const chatSchema=new mongoose.Schema({
    chatName:{
        type:String,
    },
    participants:[
        {
            type:ObjectId,
            ref:'USER'
        }
    ],
    lastMessageId:{
        type:ObjectId,
        ref:'MESSAGE'
    }
    ,
    isGroupChat:{
        type:Boolean,
        default:false
    },
    GroupAdmin:{
        type:ObjectId,
        ref:'USER'
    }
},{
    timestamps:true
})

const CHAT=mongoose.models.CHAT || mongoose.model('CHAT',chatSchema)

export default CHAT