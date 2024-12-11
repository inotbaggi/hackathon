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
import Vacancies from "./pages/Vacancies";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { token, profile } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if (profile?.verified == false) {
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
                            <Route path="/vacancies" element={<PrivateRoute><Vacancies/></PrivateRoute>}/>
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
