import React from 'react';
import {Navigate, useLocation} from 'react-router';
import useAuth from '../AuthProvider/useAuth';

const Login = () => {
    const {user,signInUsingGoogle} = useAuth()
    const getlocation = useLocation();
    const path = getlocation?.state?.location;
    return (
        <div className='text-center w-50 mx-auto my-5 p-5'>
            <h1>Please Login</h1>
            <input className='logreg' type="email" placeholder='Type your email'/>
            <br />
            <input className='logreg' type="password" placeholder='Type your password'/>
            <br />
            <button className='s-btn'>Login</button>
            <br />
            <p>----------------OR----------------</p>
            <button onClick={signInUsingGoogle} className='s-btn'>Login With Google</button>
            {
                user.displayName && path && <Navigate to={path}/>
            }
            {
                user.displayName && !path && <Navigate to='/dashboard'/> 
            }
        </div>
    );
};

export default Login;