import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";

/* Mother part of all part which are related to dashboard */
const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="row mt-1 mx-auto">
      {/* Admin Part Start */}
      {user.role === "Admin" && (
        <span className="shadow row mx-auto py-2">
          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="myprofile">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white py-1">
                My Profile
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="addremove">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white py-1">
                Manage PD
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="allorders">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white py-1">
                All Orders
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="allreviews">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white py-1">
                All Reviews
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="makeadmin">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white py-1">
                Make Admin
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2">
            <button
              className="w-100 mb-1 border-0 rounded-pill bg-dark text-white  py-1"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </span>
      )}
      {/* Admin Part End */}

      {/* User Part Start */}
      {user.role === "user" && (
        <span className="shadow-lg d-flex justify-content-center row mx-auto text-center">
          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="myprofile">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1">
                My Profile
              </button>
            </NavLink>
          </div>

          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="mycart">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1">
                My Cart
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="myorders">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1">
                My Orders
              </button>
            </NavLink>
          </div>
          <div className="col-4 col-md-2 col-lg-2">
            <NavLink to="addreview">
              <button className="w-100 mb-1 border-0 rounded-pill bg-dark text-white px-3 py-1">
                Add Review
              </button>
            </NavLink>
          </div>
        </span>
      )}
      {/* User Part Start */}

      {/* Outlet part for nested routes */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
