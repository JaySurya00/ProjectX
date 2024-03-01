import mongoose from "mongoose";

const MONGODB_URI= 'mongodb://127.0.0.1:27017/projectx';

const connectDB= async ()=>{
    try {
          await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
}

export default connectDB;