import connectDB from "@/app/lib/database";
import CHAT from "@/app/models/chatModel";
import USER from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import mongoose from 'mongoose'
export async function POST(req:NextRequest){
  const token=req.cookies.get('next-auth.session-token')?.value || req.cookies.get('__Secure-next-auth.session-token')?.value
    if(!token){
    return NextResponse.json({error:'unauthorized'},{status:401})
    }
   
  let body=await req.json()
  const {chatName,participants,isGroupChat,GroupAdminEmail,GroupPhoto}=body
  try{
   
  await connectDB();
  const reqUser=await USER.find({email:GroupAdminEmail})
  if(reqUser.length===0) return NextResponse.json({error:'Invalid user!'})
  participants.push(reqUser[0].id+"")

  if(isGroupChat){
    if(!chatName){
      return NextResponse.json({error:'Please provide a group name for the group chat!'},{status:422})
    }
    if(participants.length<2){
      return NextResponse.json({error:'Please add participants'},{status:422})
    }
  }
  else{
    if(participants.length!==2){
      return NextResponse.json({error:'Personal chat should have 2 participants'},{status:422})
    }
    const isExistingChat=await CHAT.find()
    for(const chat of isExistingChat){
        if(JSON.stringify(participants.sort())===JSON.stringify(chat.participants.sort())){
          return NextResponse.json({error:'Chat already exists!'},{status:409})
        }
      }
  }
  const chat=new CHAT({
    chatName,
    participants,
    isGroupChat,
  })
  if (isGroupChat) {
    chat.GroupAdmin = new mongoose.Types.ObjectId(reqUser[0].id);
    chat.GroupPhoto = GroupPhoto?GroupPhoto:"https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"
  }
  const createChat=await chat.save()
  if(!createChat) return NextResponse.json({error:'Could not create chat, try again'},{status:500})
return NextResponse.json({success:'Chat Created Successfully!'},{status:200})
}catch(error){
  return NextResponse.json({error:error},{status:500})
}
}