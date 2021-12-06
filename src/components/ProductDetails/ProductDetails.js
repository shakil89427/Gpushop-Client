import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router";
import useAuth from "../AuthProvider/useAuth";
import { Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { user } = useAuth();
  const [wait, setWait] = useState(false);
  const [ploading, setPloading] = useState(false);
  const [quantity, setquantity] = useState(1);

  /* Load data from server */
  useEffect(() => {
    setPloading(true);
    axios.get(`https://gpushop.herokuapp.com/details/${id}`).then((res) => {
      setProduct(res.data);
      setPloading(false);
    });
  }, [id]);

  const calculateQuantity = (value) => {
    if (value) {
      setquantity(quantity + 1);
    }
    if (quantity === 1) {
      return;
    }
    if (!value) {
      setquantity(quantity - 1);
    }
  };

  /* Add to cart function */
  const addToCart = () => {
    setWait(true);
    const userId = user.uid;
    product.quantity = quantity;
    product.userId = userId;
    axios
      .post("https://gpushop.herokuapp.com/addtocart", { userId, product })
      .then((res) => {
        if (res.data.acknowledged) {
          setWait("done");
        }
      });
  };

  return (
    <div className="container mx-auto text-center my-5">
      {wait && <Spinner className="mb-3" animation="border" />}
      {ploading ? (
        <Spinner className="mb-3" animation="border" />
      ) : (
        <div className="shadow-lg rounded">
          <img className="w-25" src={product.img} alt="" />
          <h3>{product.name}</h3>
          <h6>{product.description}</h6>
          <h4 className="text-danger">Price: ${product.price}</h4>
          <button
            onClick={() => calculateQuantity(false)}
            style={{ width: "30px" }}
            className="fw-bolder my-1 border-0 rounded  bg-dark text-white"
          >
            -
          </button>
          <input
            style={{ width: "30px" }}
            disabled
            className="quantity text-center border-0"
            type="number"
            value={quantity}
          />
          <button
            onClick={() => calculateQuantity(true)}
            style={{ width: "30px" }}
            className="fw-bolder my-1 border-0 rounded bg-dark text-white"
          >
            +
          </button>
          <br />
          <button
            disabled={wait}
            onClick={addToCart}
            className="my-1 mb-3 border-0 rounded bg-dark text-white px-3 py-1"
          >
            Add to Cart
          </button>
          <br />
          {wait === "done" && <Navigate to="/cart"></Navigate>}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
