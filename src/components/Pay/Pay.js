import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PROMISE_KEY);

const Pay = () => {
  const [products, setProducts] = useState([]);
  const [data, setdata] = useState();
  const [price, setprice] = useState();
  const { user } = useAuth();
  const [dataLoading, setdataLoading] = useState(false);

  /* Data Load Function */
  const loadData = () => {
    axios
      .get(`https://gpushop.herokuapp.com/allcart/${user.uid}`)
      .then((res) => {
        setProducts(res.data);
        setdataLoading(false);
      });
  };
  useEffect(() => {
    setdataLoading(true);
    loadData();
  }, []);

  /* Calculate Function */
  const calculate = () => {
    let gprice = 0;
    for (const product of products) {
      const newprice = product.price * product.quantity;
      gprice = gprice + newprice;
    }
    setprice(gprice);
  };
  useEffect(() => {
    calculate();
  }, [products]);

  /* Order Modify Function */
  const modify = () => {
    const newdata = [];
    products.forEach((product) => {
      const { _id, ...rest } = product;
      rest.useremail = user.email;
      rest.status = "pending";
      newdata.push(rest);
    });
    setdata(newdata);
  };
  useEffect(() => {
    modify();
  }, [products]);

  /*   Remove From Cart */
  const remove = (id) => {
    const permition = window.confirm("Are u Sure?");
    if (permition) {
      axios
        .delete(
          `https://gpushop.herokuapp.com/deletefromcart/${id}?uid=${user.uid}`
        )
        .then((res) => {
          if (res.data.deletedCount) {
            loadData();
            toast.success("Successfully removed", {
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
    }
  };

  return (
    <div className="container pb-5">
      <ToastContainer />
      <h1 className="text-center">Checkout</h1>
      <div className="row ">
        <div className="col-12 col-md-8 col-lg-8 py-5">
          {dataLoading && (
            <div className="mt-3 text-center">
              <Spinner animation="border" />
            </div>
          )}
          {products.length === 0 && (
            <p className="text-center">
              You dont have added any product <br />
              <NavLink to="/home">
                <button className="m-1 mb-3 border-0 rounded bg-dark text-white px-3 py-1">
                  Back to Home
                </button>
              </NavLink>
            </p>
          )}
          {products.map((product) => (
            <div
              key={product._id}
              className="border-bottom d-flex flex-column flex-lg-row align-items-center"
            >
              <img className="w-25" src={product.img} alt="" />
              <div className="ms-2">
                <h5>{product.name}</h5>
                <h6>Quantity: {product.quantity}</h6>
                <h6>Price: ${product.price}</h6>
                <button
                  onClick={() => remove(product._id)}
                  className="m-1 mb-3 border-0 rounded bg-dark text-white px-3 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-12 col-md-4 col-lg-4 text-center py-5">
          <Elements stripe={stripePromise}>
            <CheckoutForm loadData={loadData} price={price} data={data} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Pay;
