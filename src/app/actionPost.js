'use server'
import Posts from "@/model/post";



export const getPosts = async () => {
    try {

        const posts = await Posts.find();
        return posts;
    }
    catch (e) {
        console.log(e);
    }
}

export const queryPosts = async (query = {}) => {
    const posts = await Posts.find(query);
    return posts;
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await Posts.find({ author: userId });
        return posts;
    }
    catch (e) {
        console.log(e);
    }
}

export const getPostbyId = async (postId) => {
    try {
        const post = await Posts.findById(postId).populate('reviews.author');
        return post;
    }
    catch (e) {
        console.log(e);
    }
}

export const sortPostLikes = async () => {
    const posts = await Posts.find().sort({ 'likes': -1 });
    return posts;
}

export const likesAction = async (postId, userId) => {

    try {
        const post = await Posts.findOne({ _id: postId });
        if (post && userId !== null) {
            const isUserLiked = post.likes.includes(userId);

            if (isUserLiked) {
                await Posts.updateOne({ _id: postId }, { $pull: { likes: userId } });
            } else {
                await Posts.updateOne({ _id: postId }, { $addToSet: { likes: userId } });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export const getLikesForPost = async (postId, userId) => {
    try {
        const post = await Posts.findById(postId);
        const isUserLiked = post.likes.includes(userId);
        return { likes: post.likes.length, isUserLiked };
    }
    catch (e) {
        console.log(e);
    }
}

export const deletePostAction = async (postId) => {
    await Posts.findByIdAndDelete(postId);
}

export const deletePostReview= async (postId, reviewId)=>{
    await Posts.updateOne({ _id: postId }, { $pull: { reviews:{ _id: reviewId } }})
}
