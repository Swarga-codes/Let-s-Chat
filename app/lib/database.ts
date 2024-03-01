import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_HOST|| "")
    }
    catch(err){
        console.log('Could not establish connection to Database!',err)
    }
}
export default connectDB;