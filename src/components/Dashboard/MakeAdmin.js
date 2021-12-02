import axios from "axios";
import React, { useState } from "react";

const MakeAdmin = () => {
  const [email, setemail] = useState("");

  const handleblur = (e) => {
    setemail(e.target.value);
  };

  const makeadmin = (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Are you Sure");
    if (confirmation) {
      axios
        .post(`https://salty-spire-32816.herokuapp.com/makeadmin/${email}`)
        .then((res) => {
          if (!res.data) {
            alert("Sorry user not registered");
          } else {
            alert("Successfully promoted to an admin");
          }
          e.target.reset();
        });
    }
  };

  return (
    <div>
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
        />{" "}
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
