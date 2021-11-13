import axios from 'axios';
import React, { useState } from 'react';
import {Navigate, useLocation} from 'react-router';
import useAuth from '../AuthProvider/useAuth';

const Login = () => {
    const {user,emailsign,setloading,loading,signInUsingGoogle} = useAuth()
    const getlocation = useLocation();
    const path = getlocation?.state?.location;
    const [userdata,setuserdata] = useState({})

    const handleblur = e =>{
        const field = e.target.name
        const value = e.target.value
        const newData = {...userdata}
        newData[field] = value
        setuserdata(newData)
    }

    const login =e=>{
        e.preventDefault()
        setloading(true)
        axios.get(`https://salty-spire-32816.herokuapp.com/finduser/${userdata.email}`)
        .then(res=>{console.log(res.data)
            if(!res.data){
                setloading(false)
                alert('User not exists')
                e.target.reset()
            }
            else{
                emailsign(userdata)
                e.target.reset()
            }
        })
        
    }


    return (
        <div className='text-center w-50 mx-auto my-5 p-5'>
            {
                loading&&<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            }
            <h1>Please Login</h1>
            <form onSubmit={login}>
            <input onBlur={handleblur} required className='logreg' name='email' type="email" placeholder='Type your email'/>
            <br />
            <input onBlur={handleblur} required className='logreg' name='password' type="password" placeholder='Type your password'/>
            <br />
            <button type='submit' className='s-btn'>Login</button>
            </form>
            
            <p>----------------OR----------------</p>
            <button onClick={signInUsingGoogle} className='s-btn'>Login With Google</button>
            {
                user.email && path && <Navigate to={path}/>
            }
            {
                user.email && !path && <Navigate to='/dashboard'/> 
            }
        </div>
    );
};

export default Login;