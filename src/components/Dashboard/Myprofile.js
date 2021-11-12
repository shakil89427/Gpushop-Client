import React from 'react';
import useAuth from '../AuthProvider/useAuth';

const Myprofile = () => {
    const {user} = useAuth()
    return (
        <div>
            <h1 className='connect-h1 m-0 text-center text-white'>Your Profile</h1>
            <div className=" p-5 bg-info mx-auto text-center">
                <h5>Name: {user.displayName}</h5>
                <h5>Email: {user.email}</h5>
                <h5>Role: {user.role}</h5>
            </div>
        </div>
    );
};

export default Myprofile;