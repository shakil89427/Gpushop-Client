import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import Myprofile from "./Myprofile";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [btndefault, setbtndefault] = useState(false);
  return (
    <div className="row mt-1 mx-auto">
      {user.role === "Admin" && (
        <span className="shadow row mx-auto text-center">
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="myprofile">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                My Profile
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="addremove">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                Manage PD
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="allorders">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                All Orders
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="allreviews">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                All Reviews
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="makeadmin">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                Make Admin
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <button
              className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </span>
      )}
      {user.role === "user" && (
        <span className="shadow-lg d-flex justify-content-center row mx-auto text-center">
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="myprofile">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                My Profile
              </button>
            </NavLink>
          </div>

          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="mycart">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                My Cart
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="myorders">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                My Orders
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2 p-0">
            <NavLink to="addreview">
              <button
                onClick={() => setbtndefault(true)}
                className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1"
              >
                Add Review
              </button>
            </NavLink>
          </div>
        </span>
      )}
      <div className="col-12 col-md-3 col-lg-3 "></div>
      <div>{btndefault ? <Outlet /> : <Myprofile></Myprofile>}</div>
    </div>
  );
};

export default Dashboard;
