import React, {useEffect} from 'react';
import './css/App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {AuthProvider, useAuth} from "./AuthContext";
import Profile from "./pages/Profile";
import NotVerified from "./pages/NotVerified";
import api from "./api/axois";
import {UserDTO} from "./types";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { token, userId, profile, setProfile } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (userId && !profile) {
                try {
                    const fetchedProfile = await api.get(`api/v1/users/${userId}`);
                    setProfile(fetchedProfile.data as UserDTO);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            }
        };

        fetchProfile();
    }, [userId, profile, setProfile]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!profile) {
        return <div>Loading...</div>;
    }

    if (!profile.verified) {
        return <Navigate to="/not-verified" />;
    }

    return children;
};


function App() {

    return (
        <AuthProvider>
            <div className="flex flex-col h-screen gap-8">
                <Header/>
                <div className="mb-auto">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/not-verified" element={<NotVerified/>}/>
                            <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                            <Route path="/dashboard" element={<PrivateRoute><div>asdasd</div></PrivateRoute>}/>
                        </Routes>
                    </Router>
                </div>
                <Footer/>
            </div>
        </AuthProvider>
    );
}

export default App;
