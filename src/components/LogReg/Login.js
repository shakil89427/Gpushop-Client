import React from 'react';
import useAuth from '../AuthProvider/useAuth';

const Login = () => {
    const {user,signInUsingGoogle} = useAuth()
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
        </div>
    );
};

export default Login;