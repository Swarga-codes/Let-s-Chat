import connectDB from "@/app/lib/database";
import USER from "@/app/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    let splitUrl=request.url.split('/')
    let searchQuery=splitUrl[splitUrl.length-1]
    await connectDB();
    const findByUserOrEmail=await USER.find({$or:[{email:{$regex:searchQuery,$options:'i'}},{name:{$regex:searchQuery,$options:'i'}}]})
   
    return NextResponse.json(findByUserOrEmail,{status:200})
}