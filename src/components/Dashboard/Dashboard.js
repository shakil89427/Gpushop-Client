import React from 'react';

const Dashboard = () => {
    return (
        <>
        <h3 className='text-center'>Welcome to Dashboard</h3>
        <div className='container row mt-3'>
            <div className="col-2 text-center border-end border-3">
                <button className='s-btn'>My Cart</button>
                <button className='s-btn'>My Orders</button>
                <button className='s-btn'>My Profile</button>
                <button className='s-btn'>Add Product</button>
                <button className='s-btn'>Remove Product</button>
                <button className='s-btn'>All Orders</button>
                <button className='s-btn'>All Reviews</button>
                <button className='s-btn'>Make Admin</button>
            </div>

            <div className="col-10">

            </div>
        </div>
        </>
    );
};

export default Dashboard;