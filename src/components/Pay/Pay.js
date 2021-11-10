import React from 'react';
import { useParams } from 'react-router';

const Pay = () => {
    const {id} = useParams()

    const placeOrder= e =>{
        e.preventDefault()
    }
    return (
        <div>
            <h1 className='connect-h1 text-white text-center'>Please Fill All Details</h1>
            <form onSubmit={placeOrder} className='form'>
                <input type="text" required placeholder='Enter your name'/>
                <br />
                <input type="email" required placeholder='Enter your Email'/>
                <br />
                <input type="text" placeholder='Enter your Address'/>
                <br />
                <button type='submit' className='s-btn'>Place Order</button>
            </form>
        </div>
    );
};

export default Pay;