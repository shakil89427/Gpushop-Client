import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";

const Header = () => {
  const {user,logout} = useAuth()
  return (
    <>
      <div className=" w-25 border-bottom container d-flex justify-content-center align-items-center">
        <img
          className="w-25"
          src="https://static.thenounproject.com/png/217781-200.png"
          alt=""
        />
        <h1 className="title m-0">GPUsHOP</h1>
      </div>
      <div className="w-75 mx-auto d-flex justify-content-center align-items-center border-bottom p-1">
        <NavLink to='/'><button className='h-btn'>Home</button></NavLink>
        <NavLink to='/allproducts'><button className='h-btn'>All Products</button></NavLink>
        {
          user.email&&<NavLink to='/dashboard'><button className='h-btn'>Dashboard</button></NavLink>
        }
        {
          user.email?<button onClick={logout} className='h-btn'>Logout</button>:<span><NavLink to='/login'><button className='h-btn'>Login</button></NavLink>
          <NavLink to='/signup'><button className='h-btn'>Signup</button></NavLink></span>
        }
        
      </div>
      {
          user.displayName&& <p className='text-center'>Hello: {user.displayName}</p>
        }
    </>
  );
};

export default Header;
