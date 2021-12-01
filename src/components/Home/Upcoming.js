import axios from "axios";
import React, { useEffect, useState } from "react";

const Upcoming = () => {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    axios
      .get("https://salty-spire-32816.herokuapp.com/upcoming")
      .then((res) => setUpcoming(res.data));
  }, []);

  return (
    <div>
      <div>
        <h1 className="fw-bolder text-center mt-3">Upcoming Products</h1>
        <hr className="w-25 py-1 mx-auto rounded mt-0" />
        <div className="row">
          {upcoming.map((product) => (
            <div
              className="col-6 col-md-4 col-lg-3 text-center"
              key={product._id}
            >
              <img className="up-img" src={product.img} alt="" />
              <h6>{product.name}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
