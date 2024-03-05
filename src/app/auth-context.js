'use client'
import { useState, createContext, useContext, useEffect } from 'react';
import { authenticate } from '@/lib/auth';
import { deleteCookie } from '@/lib/deleteCookies';

const intialAuthState = {
    user: null,
    isLoggedIn: false,
}

const AuthContext = createContext(intialAuthState);

const AuthProvider = ({ children }) => {
    const [AuthState, setAuthState] = useState(intialAuthState);
    useEffect(() => {
        const checkAuthentication = async () => {
            const { user, isLoggedIn } = await authenticate();
            if (isLoggedIn) {
                setAuthState(
                    {
                        user: {
                            userId: user.id,
                            name: user.name
                        }, 
                        isLoggedIn
                    }
                );
            }
        }
        checkAuthentication();
    }, [])

    const login = (userData) => {
        console.log('from authcontext', userData);
        const { userId, name } = userData;
        setAuthState({
            user: {
                userId: userId,
                name: name
            },
            isLoggedIn: true,
        })
    }
    const logout = () => {
        deleteCookie();
        setAuthState(intialAuthState);
    }

    return (
        <AuthContext.Provider value={{ AuthState, login, logout }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;