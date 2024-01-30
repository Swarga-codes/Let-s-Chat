import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/database";
import USER from "@/app/models/userModel";
export async function POST(req:NextRequest){
     let body = await req.json()
     const {name,email,profilePic}=body
     try{
     if(!name || !email) {
          return NextResponse.json({error:'One or more fields are missing!'},{status:422})
     }
     const emailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
     if(!emailRegex.test(email)) {
          return NextResponse.json({error:'Email is not valid'},{status:422})
     }
     await connectDB()
     const isExisting=await USER.find({email:email})
     if(isExisting.length!==0) return NextResponse.json({message:'User already exists'},{status: 409})
     const user=new USER({name:name,email:email,profilePic})
     const userCreated=await user.save()
     if(!userCreated) {
          return NextResponse.json({error:'Could not create user, try again!'},{status:500})
     }
     return NextResponse.json({message:'User created successfully'},{status:200})
     }
     catch(err){
          return NextResponse.json({error:err},{status:500})
     }
}