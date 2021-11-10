import React from 'react';

const Signup = () => {
    return (
        <div className='text-center w-50 mx-auto my-5 p-5'>
            <h1>Please Signup</h1>
            <input className='logreg' type="text" placeholder='Type your Name'/>
            <br />
            <input className='logreg' type="email" placeholder='Type your email'/>
            <br />
            <input className='logreg' type="password" placeholder='Type your password'/>
            <br />
            <button className='s-btn'>Signup</button>
            <br />
            <p>----------------OR----------------</p>
            <button className='s-btn'>Google Signup</button>
        </div>
    );
};

export default Signup;