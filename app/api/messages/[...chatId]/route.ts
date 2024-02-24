import CHAT from "@/app/models/chatModel";
import MESSAGE from "@/app/models/messageModel";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import USER from "@/app/models/userModel";
export async function GET(req:NextRequest){
    const token=req.cookies.get('next-auth.session-token')?.value
    if(!token){
    return NextResponse.json({error:'unauthorized'},{status:401})
    }
    try{
    const decoded = await decode({
            token: token,
            secret: process.env.NEXTAUTH_SECRET || "",
          });
    const getUserId=await USER.find({email:decoded?.email})
    const chatId=req.url.substring(req.url.lastIndexOf('/')+1)
    const isValidChat=await CHAT.find({_id:chatId})
    if(isValidChat.length===0) return NextResponse.json({error:'Invalid chat id'},{status:404})
    if(!isValidChat[0].participants.includes(getUserId[0]._id)){
        return NextResponse.json({error:'User not authorized to access these messages'},{status:401})
    }
    let findMessages=await MESSAGE.find({chatId:chatId}).populate('sender').populate('chatId').populate({
        path:'chatId',
        populate:{
            path:'participants'
        }
    })
    return NextResponse.json(findMessages,{status:200})
    }
    catch(err){
        return NextResponse.json(err,{status:500})
    }
}