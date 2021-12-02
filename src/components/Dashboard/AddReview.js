import axios from "axios";
import React, { useState } from "react";
import useAuth from "../AuthProvider/useAuth";

const AddReview = () => {
  const [review, setreview] = useState("");
  const { user } = useAuth();

  const addreview = (e) => {
    e.preventDefault();
    const info = { username: user.displayName, feedback: review };
    axios
      .post("https://salty-spire-32816.herokuapp.com/addreview", info)
      .then((res) => {
        if (res.data.acknowledged) {
          alert("Review Successfully Added");
          e.target.reset();
        }
      });
  };
  return (
    <div className="text-center">
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
        <button
          type="submit"
          className="m-1 border-0 rounded bg-dark text-white px-3 py-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
