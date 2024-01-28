import connectDB from "@/app/lib/database";
import CHAT from "@/app/models/chatModel";
import USER from "@/app/models/userModel";
import { NextResponse } from "next/server";
import mongoose from 'mongoose'
export async function POST(req:Request){
  if(!req.cookies.has('next-auth.session-token')){
    return NextResponse.json({error:'unauthorized'},{status:401})
  }
  let body=await req.json()
  const {chatName,participants,isGroupChat,GroupAdminEmail}=body
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
  }
  const chat=new CHAT({
    chatName,
    participants,
    isGroupChat,
  })
  if (isGroupChat) {
    chat.GroupAdmin = mongoose.Types.ObjectId(reqUser[0].id);
  }
  const createChat=await chat.save()
  if(!createChat) return NextResponse.json({error:'Could not create chat, try again'},{status:500})
return NextResponse.json({success:'Chat Created Successfully!'},{status:200})
}catch(error){
  return NextResponse.json({error:error},{status:500})
}
}