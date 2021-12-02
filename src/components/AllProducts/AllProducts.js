import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://salty-spire-32816.herokuapp.com/allproducts")
      .then((res) => setProducts(res.data));
  }, []);
  return (
    <div className="">
      <h1 className="fw-bolder text-center mt-3">All Available Products</h1>
      <hr className=" w-25 py-1 mx-auto rounded mt-0" />
      {products.length === 0 ? (
        <div className="my-5 py-5 text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="container mx-auto row">
          {products.map((product) => (
            <div key={product._id} className="p-2 col-12 col-md-4 col-lg-3">
              <div className="p-2 rounded shadow allpd d-flex flex-column justify-content-between text-center">
                <img className="mx-auto pr-img" src={product.img} alt="" />
                <p>{product.description}</p>
                <span>
                  <h6 className="text-danger">Price: ${product.price}</h6>
                  <NavLink to={`/productdetails/${product._id}`}>
                    <button className="mb-2 border-0 rounded bg-dark text-white px-3 py-1">
                      More Details & Buy
                    </button>
                  </NavLink>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
