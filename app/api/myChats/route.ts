import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import CHAT from "@/app/models/chatModel";
import USER from "@/app/models/userModel";
import { redirect } from "next/navigation";
export async function GET(req:NextRequest){
  try{
  const token=req.cookies.get('next-auth.session-token')?.value || req.cookies.get('__Secure-next-auth.session-token')?.value
    if(!token){
    // return NextResponse.json({error:'unauthorized'},{status:401})
    redirect('/login')
    }
  
    const decoded = await decode({
        token: token,
        secret: process.env.NEXTAUTH_SECRET || "",
      });

    const getUserId=await USER.find({email:decoded?.email})
     
    if(getUserId.length===0) return NextResponse.json({error:'Could not retrieve user data'},{status:404})
    const getUserChats=await CHAT.find({participants:{$in:[getUserId[0]._id]}}).populate('participants').populate({
        path: 'lastMessageId',
        model:'CHAT',
        match: { lastMessageId: { $exists: true } } // Ensures only documents with `editor` field are populated
      })
    return NextResponse.json(getUserChats,{status:200})
    }
    catch(err){
        // return NextResponse.json({error:err},{status:500})
        redirect('/login')
    }
}