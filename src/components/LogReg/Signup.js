import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../AuthProvider/useAuth';

const Signup = () => {
    const {user,register,loading,signInUsingGoogle} = useAuth()
    const [userdata,setuserdata] = useState({})


    const handleblur = e=>{
        const field = e.target.name
        const value = e.target.value
        const newData = {...userdata}
        newData[field] = value
        setuserdata(newData)
    }

    const registerdata=e=>{
        e.preventDefault()
        const email = userdata.email
        const password = userdata.password
        if(password.length<6){
            alert('Password must be 6 character long')
            return
        }
        axios.get(`https://salty-spire-32816.herokuapp.com/finduser/${email}`)
        .then(res=>{
            if(!res.data){
                register(userdata)
                e.target.reset()
            }
            else{
                alert('Email already Exists')
            }
        })
        
    }

    return (
        <div className='text-center w-50 mx-auto my-5 p-5'>
            {
                loading?<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> : <span>
            <h1>Please Signup</h1>
            <form onSubmit={registerdata}>
            <input className='logreg' onBlur={handleblur} required name='displayName' type="text" placeholder='Type your Name'/>
            <br />
            <input className='logreg' onBlur={handleblur} required name='email' type="email" placeholder='Type your email'/>
            <br />
            <input className='logreg' onBlur={handleblur} required name='password' type="password" placeholder='Type your password'/>
            <br />
            <button type='submit' className='s-btn'>Signup</button>
            </form>
            <p>----------------OR----------------</p>
            <button onClick={signInUsingGoogle} className='s-btn'>Google Signup</button>
            {
                user.email && <Navigate to='/dashboard'/> 
            }
            </span>
            }
        </div>
    );
};

export default Signup;