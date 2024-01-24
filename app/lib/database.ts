import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://swargarajd:chatapp123@cluster0.ikdkqq5.mongodb.net/?retryWrites=true&w=majority")
        console.log('Mongo DB Connected!')
    }
    catch(err){
        console.log('Could not establish connection to Database!',err)
    }
}
export default connectDB;