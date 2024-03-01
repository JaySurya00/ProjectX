import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const reviewSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    review: String
})

const postSchema = new Schema({
    postType: {
        type: String,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    year: Number,
    genre: [{
        type: String,
        trim: true,
    }],
    description: {
        type: String,
        trim: true,
        required: true,
    },
    img_url: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    reviews: [
        {
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String
        }
    ]

})

///Learn about aggregation pipeline of mongoDB
postSchema.static('addReview', async function (postId, review) {
    await this.updateOne({ _id: postId }, { $push: { reviews: review } });
})

const Posts = mongoose.models.Post || model('Post', postSchema);
export default Posts;