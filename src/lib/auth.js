'use server'
import { cookies } from "next/headers";
import * as jose from 'jose';

const secret = new TextEncoder().encode(
    'muskansinghvi',
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
        console.log(e);
        return { user: null, isLoggedIn: false };
    }
}