import mongoose from 'mongoose';
const uri = process.env.URI;

export default async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    mongoose.connect(uri, {dbName: 'ProjectX'});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch (e) {
    console.log('Error from DB', e);
  }
}