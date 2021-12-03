import axios from "axios";
import React, { useState } from "react";
import useAuth from "../AuthProvider/useAuth";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const AddReview = () => {
  const [review, setreview] = useState("");
  const { user } = useAuth();
  const [wait, setWait] = useState(false);

  const addreview = (e) => {
    setWait(true);
    e.preventDefault();
    const info = { username: user.displayName, feedback: review };
    axios
      .post("https://salty-spire-32816.herokuapp.com/addreview", info)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Your Review is Added", {
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
          setWait(false);
          e.target.reset();
        }
      });
  };
  return (
    <div className="text-center">
      <ToastContainer />
      <h1 className="text-center">Write A Review</h1>
      <hr className="w-25 mx-auto pb-1" />
      <form onSubmit={addreview}>
        <textarea
          type="text"
          required
          style={{ width: "350px" }}
          onChange={(e) => {
            setreview(e.target.value);
          }}
          className="border shadow p-3 rounded my-2"
          rows="5"
        ></textarea>
        <br />
        {wait ? (
          <div className="m-1 text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <button
            type="submit"
            className="m-1 border-0 rounded bg-dark text-white px-3 py-1"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddReview;
