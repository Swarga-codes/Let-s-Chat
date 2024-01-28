import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import CHAT from "@/app/models/chatModel";
import USER from "@/app/models/userModel";
export async function GET(req:NextRequest){
    const token=req.cookies.get('next-auth.session-token')?.value
    if(!token){
    return NextResponse.json({error:'unauthorized'},{status:401})
    }
    try{
    const decoded = await decode({
        token: token,
        secret: process.env.NEXTAUTH_SECRET,
      });

    const getUserId=await USER.find({email:decoded?.email})
    if(getUserId.length===0) return NextResponse.json({error:'Could not retrieve user data'},{status:404})
    const getUserChats=await CHAT.find({participants:{$in:[getUserId[0].id]}})  
    return NextResponse.json(getUserChats,{status:200})
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}