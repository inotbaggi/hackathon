import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="flex flex-col h-screen gap-8">
          <Header/>
          <div className="mb-auto">
              <Router>
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/dashboard" element={<ProtectedRoute>
                          <div>Dashboard</div>
                      </ProtectedRoute>}/>
                  </Routes>
              </Router>
          </div>
          <Footer/>
      </div>

  );
}

export default App;
