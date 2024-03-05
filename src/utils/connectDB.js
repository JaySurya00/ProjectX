import mongoose from "mongoose";
const URI= process.env.URI;

const connectDB= async ()=>{
    try{
        await mongoose.createConnection(URI,{dbName: 'ProjectX'}).asPromise();
        console.log('Connected to MonogoDB');
    }
   catch(e)
   {
    console.log('Error from DB', e);
   }
}
connectDB();