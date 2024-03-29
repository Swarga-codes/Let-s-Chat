import CHAT from "@/app/models/chatModel";
import MESSAGE from "@/app/models/messageModel";
import USER from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
export async function POST(req:NextRequest) {
    const token=req.cookies.get('next-auth.session-token')?.value || req.cookies.get('__Secure-next-auth.session-token')?.value
    if(!token){
    return NextResponse.json({error:'unauthorized'},{status:401})
    }
    try{
    const decoded = await decode({
        token: token,
        secret: process.env.NEXTAUTH_SECRET || "",
      });
    
    const reqUser=await USER.find({email:decoded?.email})
    const body=await req.json()
    const {chatId,content}=body
    if(!chatId || !content){
        return NextResponse.json({error:'Required fields are missing!'},{status:422})
    }
    const doesChatExist=await CHAT.find({_id:chatId})
    if(doesChatExist.length===0) return NextResponse.json({error:'Invalid chat id'},{status:404}) 
    const newMessage={
        sender:reqUser[0]._id,
        content,
        chatId
    }
    let sendMessage=await MESSAGE.create(newMessage)
    if(!sendMessage) return NextResponse.json({error:'Could not send message, try again!'},{status:500})
    await CHAT.findByIdAndUpdate(chatId,{lastMessageId:sendMessage})    
    sendMessage=await sendMessage.populate('sender')
    sendMessage=await sendMessage.populate('chatId')
    sendMessage=await sendMessage.populate('chatId.participants')
   
    
    return NextResponse.json(sendMessage,{status:200})
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}