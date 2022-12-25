import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = (props) =>  {
    const user = localStorage.getItem('token');

    if(!user) {
        return <Redirect to="/" />;
    }

    return <Route {...props} />;
};

export default ProtectedRoute;
