import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router";
import useAuth from "../AuthProvider/useAuth";

const Signup = () => {
  const { user, register, loading, setloading } = useAuth();
  const [userdata, setuserdata] = useState({});

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...userdata };
    newData[field] = value;
    setuserdata(newData);
  };

  const registerdata = (e) => {
    e.preventDefault();
    if (userdata.password === userdata.password2) {
      if (userdata.password.length < 6) {
        alert("hi");
      } else {
        setloading(true);
        axios
          .post("https://salty-spire-32816.herokuapp.com/finduser", userdata)
          .then((res) => {
            if (!res.data._id) {
              register(userdata);
            } else {
              setloading(false);
              alert("Email already Exists");
            }
            e.target.reset();
          });
      }
    }
  };
  return (
    <div className="text-center container mx-auto my-3 p-5">
      {loading && <Spinner className="mb-3" animation="border" />}
      <div className="shadow-lg rounded">
        <h1>Please Signup</h1>
        <form onSubmit={registerdata}>
          <input
            onChange={handleChange}
            required
            style={{ width: "350px" }}
            className="logreg-form bg-white shadow border-0 my-2 p-2 rounded"
            name="displayName"
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
      {user.email && <Navigate to="/dashboard" />}
    </div>
  );
};

export default Signup;
