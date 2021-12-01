import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

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
        {upcoming.length === 0 ? (
          <div className="my-5 py-5 text-center">
            <Spinner animation="border" />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Upcoming;
