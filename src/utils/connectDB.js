import mongoose from 'mongoose';
const uri = `mongodb+srv://jaysurya00:Jay%40surya2001@projectscluster.aykhspt.mongodb.net/?retryWrites=true&w=majority&appName=ProjectsCluster`

export default async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    mongoose.connect(uri, {dbName: 'ProjectX'});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch (e) {
    console.log('from DB', e);
  }
}
