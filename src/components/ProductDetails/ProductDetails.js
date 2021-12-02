import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import useAuth from "../AuthProvider/useAuth";
import { NavLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [redirect, setredirect] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const [wait, setWait] = useState(false);

  useEffect(() => {
    axios
      .get(`https://salty-spire-32816.herokuapp.com/details/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = () => {
    setWait(true);
    product.userId = user.uid;
    axios
      .post("https://salty-spire-32816.herokuapp.com/addtocart", product)
      .then((res) => {
        if (res.data.acknowledged) {
          setWait(false);
          alert("Successfully added to cart");
          setredirect(true);
        }
      });
  };

  return (
    <div className="container mx-auto text-center my-5">
      {wait && <Spinner className="mb-3" animation="border" />}
      <div className="shadow-lg rounded">
        <img className="w-25" src={product.img} alt="" />
        <h3>{product.name}</h3>
        <h6>{product.description}</h6>
        <h4 className="text-danger">Price: ${product.price}</h4>
        <button
          onClick={addToCart}
          className="m-1 mb-3 border-0 rounded bg-dark text-white px-3 py-1"
        >
          Add to Cart
        </button>
        <br />
        {redirect && (
          <NavLink to="/pay">
            <button className="m-1 mb-3 border-0 rounded bg-dark text-white px-3 py-1">
              Procced to Pay
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
