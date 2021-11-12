import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../AuthProvider/useAuth';

const PrivateRoute = ({children,...rest}) => {
    const {user,loading} = useAuth()
    const location = useLocation();
    if(loading){
        return <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    }
    if(!user.displayName){
        return <Navigate to='/login' state={{location}}/>
    }
    return children
};

export default PrivateRoute;