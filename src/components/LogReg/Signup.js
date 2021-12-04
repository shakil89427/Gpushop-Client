import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router";
import useAuth from "../AuthProvider/useAuth";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { user, loading, setloading, issue, setIssue, registerWithEmail } =
    useAuth();
  const [userdata, setuserdata] = useState({});

  /* For Error Handeling */
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

  /* Get Inputes Value */
  const handleChange = (e) => {
    const newData = { ...userdata };
    const field = e.target.name;
    if (field === "email") {
      const value = e.target.value.toLowerCase();
      newData[field] = value;
      setuserdata(newData);
    } else {
      const value = e.target.value;
      newData[field] = value;
      setuserdata(newData);
    }
  };

  /* Registration function Start */
  const registerdata = (e) => {
    e.preventDefault();

    /* Password Checking Start */
    if (userdata.password !== userdata.password2) {
      return toast.warn("password Didn't matched", {
        position: "top-center",
        autoClose: 3000,
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
      return toast.warn("password must be minimum 6 character", {
        position: "top-center",
        autoClose: 3000,
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
    axios
      .post("https://salty-spire-32816.herokuapp.com/finduser", userdata)
      .then((res) => {
        if (res.data.insertedId) {
          /* Main Registration function */
          registerWithEmail(userdata);
        } else {
          setloading(false);
          toast.warn("Email Already exist Please login", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
            transition: Slide,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  /* Registration function End */

  return (
    <div className="text-center container mx-auto p-5">
      <ToastContainer />
      {loading && <Spinner className="mb-1" animation="border" />}
      <div className="shadow-lg rounded">
        <h1>Please Signup</h1>
        <form onSubmit={registerdata}>
          <input
            onChange={handleChange}
            required
            style={{ width: "350px" }}
            className="logreg-form bg-white shadow border-0 my-2 p-2 rounded"
            name="name"
            type="text"
            placeholder="Type your Name"
          />
          <br />
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
            className="my-3 border-0 rounded bg-dark text-white px-5 py-2"
          >
            Signup
          </button>
        </form>
      </div>
      {user.name && <Navigate to="/dashboard/myprofile" />}
    </div>
  );
};

export default Signup;
