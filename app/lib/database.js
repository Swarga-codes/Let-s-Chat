import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo DB Connected!')
    }
    catch(err){
        console.log('Could not establish connection to Database!')
    }
}