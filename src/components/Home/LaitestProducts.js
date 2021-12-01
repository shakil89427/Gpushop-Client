import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const LaitestProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://salty-spire-32816.herokuapp.com/allproducts")
      .then((res) => {
        const data = res.data;
        const newData = data.slice(2, 8);
        setProducts(newData);
      });
  }, []);

  return (
    <div>
      <h1 className="fw-bolder text-center mt-3">Laitest Products</h1>
      <hr className=" w-25 py-1 mx-auto rounded mt-0" />
      {!products ? (
        <div className="spinner-border" role="status">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-6 col-lg-4 " key={product._id}>
              <div className="m-1 product shadow mt-3">
                <div className="text-center">
                  <img className="pr-img" src={product.img} alt="" />
                  <h6>{product.name}</h6>
                </div>
                <div className="text-center mb-3">
                  <h5 className="text-danger">Price: ${product.price}</h5>
                  <NavLink to={`/productdetails/${product._id}`}>
                    <button className="m-1 shadow border-0 rounded bg-white px-3 py-1">
                      More Details & Buy
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaitestProducts;
