import connectDB from "@/utils/connectDB";
import Posts from "@/model/post";
connectDB();


export async function GET(req, res){
    const data= await Posts.find();
    return Response.json(data);
}

export async function POST(request){
    const postData= await request.json();
    const newPost= new Posts(postData);
    await newPost.save();
    return Response.json({ok: 'ok'})
}
