import React, { useState } from 'react';
import { NavLink,Outlet } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';
import Myprofile from './Myprofile';

const Dashboard = () => {
    const {user,logout} = useAuth()
    const [btndefault,setbtndefault] = useState(false)
    return (
        <div className='container row mt-5 mx-auto'>
            <div className="col-2 text-center border-end border-3">
                {
                    user.role==='user'&& <span>
                    <NavLink to='myprofile'><button onClick={()=>setbtndefault(true)} className='s-btn'>My Profile</button></NavLink>
                    <NavLink to='mycart'><button onClick={()=>setbtndefault(true)} className='s-btn'>My Cart</button></NavLink>
                    <NavLink to='myorders'><button onClick={()=>setbtndefault(true)} className='s-btn'>My Orders</button></NavLink><button className='s-btn mt-5' onClick={logout}>Logout</button></span>
                }
                {
                    user.role==='Admin'&& <span>
                    <NavLink to='myprofile'><button onClick={()=>setbtndefault(true)} className='s-btn'>My Profile</button></NavLink>
                    <NavLink to='addremove'><button onClick={()=>setbtndefault(true)} className='s-btn'>Manage Product</button></NavLink>
                    <NavLink to='allorders'><button onClick={()=>setbtndefault(true)} className='s-btn'>All Orders</button></NavLink>
                    <NavLink to='allreviews'><button onClick={()=>setbtndefault(true)} className='s-btn'>All Reviews</button></NavLink>
                    <NavLink to='makeadmin'><button onClick={()=>setbtndefault(true)} className='s-btn'>Make Admin</button></NavLink><button className='s-btn mt-5' onClick={logout}>Logout</button></span>
                }
            </div>

            <div className="col-10">
                {
                    btndefault? <Outlet/>: <Myprofile></Myprofile>
                }
            </div>
        </div>
    );
};

export default Dashboard;