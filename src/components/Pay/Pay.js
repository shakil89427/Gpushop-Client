import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../AuthProvider/useAuth';

const Pay = () => {
    const [product,setProduct] = useState({})
    const {user} = useAuth();
    const {id} = useParams()

    const onBlur= e =>{
        const field = e.target.name
        const value = e.target.value
        const info = {...product}
    }

    const placeOrder= e =>{
        e.preventDefault()
    }
    useEffect(()=>{
        axios.get(`http://localhost:5000/details/${id}`)
        .then(res=>setProduct(res.data))
    },[])
    return (
        <div>
            <h1 className='connect-h1 text-white text-center'>Please Fill All Details</h1>
            <form onSubmit={placeOrder} className='form'>
                <input onBlur={onBlur} value={user.displayName} type="text" name='username' required placeholder='Enter your name'/>
                <br />
                <input onBlur={onBlur} value={user.email} type="email" name='useremail' required placeholder='Enter your Email'/>
                <br />
                <input onBlur={onBlur} type="text" name='usereaddress' required placeholder='Enter your Address'/>
                <br />
                <button type='submit' className='s-btn'>Place Order</button>
            </form>
        </div>
    );
};

export default Pay;