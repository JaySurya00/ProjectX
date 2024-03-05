'use server'
import Posts from "@/model/post";
import User from "@/model/user";
import mongoose from "mongoose";
await mongoose.connect(process.env.URI)

export const addBookmarkAction = async (userId, postId) => {
    const user = await User.findById(userId);
    if (user) {
        const isBookmarked = user.bookmarks.includes(postId);

        if (isBookmarked) {
            await User.updateOne({ _id: userId }, { $pull: { bookmarks: postId } });
        } else {
            await User.updateOne({ _id: userId }, { $addToSet: { bookmarks: postId } });
        }
    }
}

export const checkBookmarked = async (userId, postId) => {
    const user = await User.findById(userId);
    return user?.bookmarks.includes(postId);
}

export const getUserBookmarks = async (userId) => {
    const userBookmarks = await User.findById(userId).populate('bookmarks');
    return userBookmarks ? userBookmarks.bookmarks : [];
}

export const getBookmarkCount = async (postId) => {
    const count = await User.getBookmarkCountForPost(postId);
    return count;
};

export const addReviewAction = async (postId, review) => {
    await Posts.addReview(postId, review);
}