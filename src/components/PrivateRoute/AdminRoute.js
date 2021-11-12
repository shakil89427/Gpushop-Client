import React from 'react';
import useAuth from '../AuthProvider/useAuth';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth()
    
    if(loading){
        return <div className="spinner-border" role="status">
        <span className="visually-hidden"></span>
      </div>
    }

    if(user.role==='Admin'){
        return children
    }
};

export default AdminRoute;