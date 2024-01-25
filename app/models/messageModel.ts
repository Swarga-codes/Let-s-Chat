import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema.Types
const messageSchema=new mongoose.Schema({
sender:{
    type:ObjectId,
    ref:'USER'
},
content:{
    type:String,
    required:true,
    trim:true
},
chatId:{
    type:ObjectId,
    ref:'CHAT'
}
},{
    timestamps:true
})

const MESSAGE=mongoose.models.MESSAGE || mongoose.model('MESSAGE',messageSchema)

export default MESSAGE;