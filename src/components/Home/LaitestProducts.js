import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const LaitestProducts = () => {
  const [products, setProducts] = useState([]);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    setWait(true);
    axios.get("https://gpushop.herokuapp.com/allproducts").then((res) => {
      const data = res.data;
      const newData = data.slice(2, 8);
      setProducts(newData);
      setWait(false);
    });
  }, []);

  return (
    <div>
      <h1 className="fw-bolder text-center">Laitest Products</h1>
      <hr className=" w-25 py-1 mx-auto rounded mt-0" />
      {wait ? (
        <div className="py-5 my-5 text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-6 col-lg-4 " key={product._id}>
              <div className="laitest d-flex flex-column justify-content-between m-1 shadow rounded mt-3 px-2">
                <div className="text-center">
                  <img className="pr-img" src={product.img} alt="" />
                  <h6>{product.name}</h6>
                </div>
                <div className="text-center mb-3">
                  <h5 className="text-danger">Price: ${product.price}</h5>
                  <NavLink to={`/productdetails/${product._id}`}>
                    <button className="mb-2 border-0 rounded bg-dark text-white px-3 py-1">
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
