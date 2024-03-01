import connectDB from "@/utils/connectDB";
import Posts from "@/model/post";
connectDB();


export async function PATCH(req, context){
    const {likes}= await req.json();
    console.log(likes);
    const id= context.params.id;
    await Posts.findByIdAndUpdate(id, {likes:likes});
    return Response.json({},{status: 200});
}
