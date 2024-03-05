'use server'
import { cookies } from 'next/headers'
import Posts from "@/model/post";
import User from "@/model/user";
import { generateToken } from "@/utils/generateToken";
import { authenticate } from '@/lib/auth';

export const registrationAction = async (formData) => {

    const { firstName, lastName, username, password } = formData;
    try {
        if (await User.findOne({ username })) {
            return { user: null, error: 'username already in use' }
        }
        const newUser = new User({ firstName, lastName, username, password });
        await newUser.save();
        const token = await generateToken(newUser);
        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
            path: '/',
        })
        return JSON.stringify({ user: newUser, error: null });
    }
    catch (e) {
        console.log('Error from registraion Form',e);
    }
}

export const loginAction = async (formData) => {
    const { username, password } = formData;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = await generateToken(user);
        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
            path: '/',
        })
        const { _id, firstName, lastName } = user;
        return { id: _id.toString(), name: firstName + ' ' + lastName };
    }
    else {
        return null;
    }

}

export const addPostAction = async (formData) => {
    try {
        const { user } = await authenticate();
        const newPost = new Posts({ ...formData, author: user.id });
        const post = await newPost.save();
        Response.json('Post Addded', {status: 201});
    }
    catch (e) {
        Response.json('Internal Error', {status: 500});
        console.log(e);
    }
}