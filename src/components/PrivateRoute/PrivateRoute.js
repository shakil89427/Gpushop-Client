import React from 'react';
import { Navigate, Route } from 'react-router';
import useAuth from '../AuthProvider/useAuth';

const PrivateRoute = ({children,...rest}) => {
    const {user,loading} = useAuth()
    if(loading){
        return <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    };
    return (
        <div className=""></div>
    );
};

export default PrivateRoute;