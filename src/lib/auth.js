'use server'
import { cookies } from "next/headers";
import * as jose from 'jose';

const secret = new TextEncoder().encode(
    process.env.SECRET_KEY
  )

export const authenticate = async () => {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    try {
        if (tokenCookie?.value) {
            const jwt = cookieStore.get('token');
            const {payload} = await jose.jwtVerify(jwt.value, secret);
            return { user: payload.userData , isLoggedIn: true };
        }
        return { user: null, isLoggedIn: false };
    }
    catch (e) {
        cookieStore.delete('token');
        return {user: null, isLoggedIn: false}
    }
}