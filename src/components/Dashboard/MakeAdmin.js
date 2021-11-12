import axios from 'axios';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email,setemail] = useState('')

    const handleblur=e=>{
        setemail(e.target.value)
    }

    const makeadmin = e =>{
        e.preventDefault()
        const confirmation=window.confirm('Are you Sure')
        if(confirmation){
            axios.post(`http://localhost:5000/makeadmin/${email}`)
            .then(res=>{
                if(!res.data){
                    alert('Sorry user not registered')
                }
                else{
                    alert('Successfully promoted to an admin')
                }
                e.target.reset()
            })
        }
    };

    return (
        <div>
            <h1 className='connect-h1 text-white text-center'>Make An Admin</h1>
            <h3 className='text-center mt-3'>Enter a registered user Email</h3>
            <form onSubmit={makeadmin} className='text-center mt-3'>
                <input onBlur={handleblur} className='admin-input' required type="email"/> <br />
                <button className='admin-btn' type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default MakeAdmin;