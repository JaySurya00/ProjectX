import mongoose from "mongoose";
const { Schema, model} = mongoose;


const userSchema= new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: String,
    },
    myPosts: [{
        type: Schema.ObjectId,
        ref: 'Post'
    }],
    bookmarks: [{
        type: Schema.ObjectId,
        ref: 'Post'
    }]
})

userSchema.static('getBookmarkCountForPost', async function(postId){
    try {
        const result = await this.aggregate([
          {
            $match: {
              bookmarks: new mongoose.Types.ObjectId(postId),
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
        ]);
    
        if (result.length > 0) {
          return result[0].count;
        } else {
          return 0;
        }
      } catch (error) {
        console.error('Error getting bookmark count:', error);
        throw error;
      }
})

const User= mongoose.models.User || model('User', userSchema);

export default User;
