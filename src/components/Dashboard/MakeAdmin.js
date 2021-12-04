import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MakeAdmin = () => {
  const [email, setemail] = useState("");

  const handleblur = (e) => {
    setemail(e.target.value);
  };

  /* Make admin function */
  const makeadmin = (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Are you Sure");
    if (confirmation) {
      axios
        .post(`https://gpushop.herokuapp.com/makeadmin/${email}`)
        .then((res) => {
          if (!res.data) {
            toast.warn("Sorry User Not Registered", {
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
          } else {
            toast.success("Successfully promoted to an admin", {
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
          e.target.reset();
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center">Make An Admin</h1>
      <hr className="w-25 mx-auto pb-1" />
      <h3 className="text-center mt-3">Enter a registered user Email</h3>
      <form onSubmit={makeadmin} className="text-center mt-3">
        <input
          onBlur={handleblur}
          style={{ width: "400px" }}
          className="border py-1 px-3 rounded-pill shadow-lg"
          required
          type="email"
        />
        <br />
        <button
          className="m-3 border-0 rounded bg-dark text-white px-3 py-1"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeAdmin;
