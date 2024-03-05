import mongoose from "mongoose";
const URI= process.env.URI;
console.log(URI);
const connectDB= async ()=>{
    try{
        await mongoose.connect(URI,{dbName: 'ProjectX'});
        console.log('Connected to MonogoDB');
    }
   catch(e)
   {
    console.log('Error from DB', e);
   }
}

export default connectDB;