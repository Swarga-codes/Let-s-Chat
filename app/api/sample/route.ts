import { NextResponse } from "next/server";
import connectDB from "@/app/lib/database";
import USER from "@/app/models/userModel";
export const config = {
     api: {
       bodyParser: true,
     },
   };
export async function POST(req:Request){
     let body = await req.json()
     const {name,email}=body
     try{
     if(!name || !email) {
          return NextResponse.json({error:'One or more fields are missing!'},{status:422})
     }
     const emailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
     if(!emailRegex.test(email)) {
          return NextResponse.json({error:'Email is not valid'},{status:422})
     }
     await connectDB()
    
     const user=new USER({name:name,email:email})
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