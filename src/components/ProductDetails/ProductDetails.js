import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import useAuth from "../AuthProvider/useAuth";
import { NavLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [redirect, setredirect] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const [wait, setWait] = useState(false);
  const [ploading, setPloading] = useState(false);

  /* Load data from server */
  useEffect(() => {
    setPloading(true);
    axios
      .get(`https://salty-spire-32816.herokuapp.com/details/${id}`)
      .then((res) => {
        setProduct(res.data);
        setPloading(false);
      });
  }, [id]);

  /* Add to cart function */
  const addToCart = () => {
    setWait(true);
    product.userId = user.uid;
    axios
      .post("https://salty-spire-32816.herokuapp.com/addtocart", product)
      .then((res) => {
        if (res.data.acknowledged) {
          setWait(false);
          setredirect(true);
          toast.success("Successfully Added To Cart", {
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
        }
      });
  };

  return (
    <div className="container mx-auto text-center my-5">
      <ToastContainer />
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
      )}
    </div>
  );
};

export default ProductDetails;
