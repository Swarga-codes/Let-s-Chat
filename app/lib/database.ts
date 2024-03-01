import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI || "")
    }
    catch(err){
        console.log('Could not establish connection to Database!',err)
    }
}
export default connectDB;