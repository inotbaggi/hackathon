import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {UserDTO} from "./types";

interface AuthContextType {
    token: string | null;
    profile: UserDTO | null;
    userId: number | null;
    setToken: (token: string) => void;
    setUserId: (userId: number) => void;
    setProfile: (profile: UserDTO) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(Cookies.get('token') as string);
    const [userId, setUserIdState] = useState<number | null>(parseInt(Cookies.get('userId') as string));
    const [profile, setProfileState] = useState<UserDTO | null>(JSON.parse(localStorage.getItem('profile') as string));

    useEffect(() => {
        const storedToken = Cookies.get('token');
        const storedUserId = Cookies.get('userId');
        const storedProfile = sessionStorage.getItem('userProfile');

        if (storedToken) setTokenState(storedToken);
        if (storedUserId) setUserIdState(parseInt(storedUserId));
        if (storedProfile) setProfileState(JSON.parse(storedProfile));
    }, [token]);

    const setToken = (token: string) => {
        Cookies.set('token', token, { expires: 7 });
        setTokenState(token);
    };

    const setUserId = (userId: number) => {
        Cookies.set('userId', userId.toString(), { expires: 7 });
        setUserIdState(userId);
    };

    const setProfile = (profile: UserDTO) => {
        sessionStorage.setItem('userProfile', JSON.stringify(profile));
        setProfileState(profile);
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('userId');
        sessionStorage.removeItem('userProfile');
        setTokenState(null);
        setUserIdState(null);
        setProfileState(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, profile, setToken, setUserId, setProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};