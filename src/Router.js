import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Games from './components/Games'
import History from './components/History'
import cookie from 'cookie'


// Write checkAuth function here

// Check the cookies for a cookie called "loggedIn"

const checkAuth = (props) => {
    const cookies = cookie.parse(document.cookie);
    return cookies["loggedIn"] ? true : false;
    

}


// // Write ProtectedRoute function here
const ProtectedRoute = (props) => {
    // check authorization. If true, the user is valid and we let them have access.

    // This renames Component so we can use it in the ProtectedRoute below
    const { component: Component, ...rest } = props;

    return checkAuth() === true ? <Component {...rest} /> : <Navigate to='/login' />;
}


const Router = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<ProtectedRoute component={Home} />} /> */}
            <Route path="/" element={<LogIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute component={Games} />} />
            <Route path="/history" element={<History />} />
        </Routes>    
            
    );
};

export default Router;

// /register is the home page for some reason