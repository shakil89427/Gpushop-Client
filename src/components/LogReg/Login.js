import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router";
import useAuth from "../AuthProvider/useAuth";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    user,
    issue,
    setIssue,
    loading,
    setloading,
    loginWithEmail,
    signInUsingGoogle,
  } = useAuth();
  const getlocation = useLocation();
  const path = getlocation?.state?.location;
  const [userdata, setuserdata] = useState({});

  /* Error Handeling */
  useEffect(() => {
    if (issue) {
      toast.error(issue, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
        transition: Slide,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setIssue(false);
    }
  }, [issue]);

  /* Get inputes Value */
  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...userdata };
    newData[field] = value;
    setuserdata(newData);
  };

  /* Login With Email and password Start */
  const login = (e) => {
    e.preventDefault();

    /* Password checking start */
    if (userdata.password !== userdata.password2) {
      return toast.warn("Password Didn't matched", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
        transition: Slide,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    if (userdata.password.length < 6) {
      return toast.warn("Password must be minimum 6 character", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
        transition: Slide,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    /* Password checking End */

    setloading(true);
    loginWithEmail(userdata);
  };
  /* Login With Email and password End */

  return (
    <div className="text-center container mx-auto p-5">
      <ToastContainer />
      {loading && <Spinner className="mb-1" animation="border" />}
      <div className="shadow-lg rounded">
        <h1 className="w-50 mx-auto">Please Login</h1>
        <form onSubmit={login}>
          <input
            onChange={handleChange}
            required
            style={{ width: "350px" }}
            className="logreg-form bg-white shadow border-0 my-2 p-2 rounded"
            name="email"
            type="email"
            placeholder="Type your email"
          />
          <br />
          <input
            onChange={handleChange}
            required
            style={{ width: "350px" }}
            className="bg-white shadow border-0 my-2 p-2 rounded"
            name="password"
            type="password"
            placeholder="Type your password"
          />
          <br />
          <input
            onChange={handleChange}
            required
            style={{ width: "350px" }}
            className="bg-white shadow border-0 my-2 p-2 rounded"
            name="password2"
            type="password"
            placeholder="Retype your password"
          />
          <br />
          <button
            disabled={loading}
            type="submit"
            className="mt-2 border-0 rounded bg-dark text-white px-5 py-2"
          >
            Login
          </button>
        </form>

        <p className="m-0 fw-bolder py-1">---------OR---------</p>
        <button
          disabled={loading}
          onClick={signInUsingGoogle}
          className="mb-3 border-0 rounded bg-dark text-white px-4 py-2"
        >
          Google Login
        </button>
      </div>
      {user.name && path && <Navigate to={path} />}
      {user.name && !path && <Navigate to="/dashboard/myprofile" />}
      {user.displayName && path && <Navigate to={path} />}
      {user.displayName && !path && <Navigate to="/dashboard/myprofile" />}
    </div>
  );
};

export default Login;
