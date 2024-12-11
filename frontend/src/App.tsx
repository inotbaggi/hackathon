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
import VacancySearchPage from "./pages/VacancyMarketplace";
import VacancyDetailsPage from "./pages/Vacancy";
import {AllCourses, CourseDetails, LessonDetails} from "./pages/Courses";
import CourseEditor from "./pages/CourseEditor";
import Projects from "./pages/Projects";
import Course from "./pages/Course";
import Portfolio from "./pages/Portfolio";

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
                            <Route path="/vacancies" element={<VacancySearchPage/>}/>
                            <Route path="/vacancies/:id" element={<VacancyDetailsPage/>} />
                            <Route path="/empl/vacancies" element={<PrivateRoute><Vacancies/></PrivateRoute>}/>
                            <Route path="/courses" element={<Course  />} />
                            <Route path="/courses/:id" element={<CourseDetails   />} />
                            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonDetails   />} />
                            <Route path="/courses/create" element={<CourseEditor />} />
                            <Route path="/projects" element={<Projects/>}/>
                            <Route path="/portfolio" element={<Portfolio/>} />
                        </Routes>
                    </Router>
                </div>
                <Footer/>
            </div>
        </AuthProvider>
    );
}

export default App;
