import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router";
import useAuth from "../AuthProvider/useAuth";

const Login = () => {
  const { user, emailsign, setloading, loading, signInUsingGoogle } = useAuth();
  const getlocation = useLocation();
  const path = getlocation?.state?.location;
  const [userdata, setuserdata] = useState({});

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...userdata };
    newData[field] = value;
    setuserdata(newData);
  };

  const login = (e) => {
    e.preventDefault();
    if (userdata.password === userdata.password2) {
      if (userdata.password.length < 6) {
        alert("6");
      } else {
        setloading(true);
        axios
          .post("https://salty-spire-32816.herokuapp.com/finduser/", userdata)
          .then((res) => {
            if (!res.data) {
              setloading(false);
              alert("User not exists");
              e.target.reset();
            } else {
              emailsign(userdata);
              e.target.reset();
            }
          });
      }
    } else {
      alert("didnt matched");
    }
  };

  return (
    <div className="text-center container mx-auto my-3 p-5">
      {loading && <Spinner className="mb-3" animation="border" />}
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
      {user.email && path && <Navigate to={path} />}
      {user.email && !path && <Navigate to="/dashboard" />}
    </div>
  );
};

export default Login;
