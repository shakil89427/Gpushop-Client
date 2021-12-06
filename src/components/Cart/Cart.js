import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckout from "react-stripe-checkout";
import logo from "../../images/headerLogo.png";

const Pay = () => {
  const [products, setProducts] = useState([]);
  const [price, setprice] = useState();
  const [quantity, setQuantity] = useState();
  const { user } = useAuth();
  const [dataLoading, setdataLoading] = useState(false);
  const [wait, setWait] = useState(false);

  /* Payment Function */
  const payNow = async (token) => {
    setWait(true);
    if (!token) {
      return setWait(false);
    }
    const { _id, ...rest } = user;
    rest.products = products;
    const result = await axios.post("https://gpushop.herokuapp.com/payment", {
      token,
      price,
      rest,
    });
    if (result.data.acknowledged) {
      loadData();
      toast.success("Order Placed Successfully", {
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
  };

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
    let totalPrice = 0;
    let totalProducts = 0;
    for (const product of products) {
      const newprice = product.price * product.quantity;
      totalPrice = totalPrice + newprice;
      totalProducts = totalProducts + product.quantity;
    }
    setprice(totalPrice);
    setQuantity(totalProducts);
  };
  useEffect(() => {
    calculate();
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
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="shadow mb-2 p-2 d-flex  align-items-center justify-content-between"
              >
                <div className="p-2 d-flex align-items-center">
                  <img
                    style={{ width: "200px", height: "200px" }}
                    className="p-3"
                    src={product.img}
                    alt=""
                  />
                  <div className="ms-2">
                    <h6>{product.name}</h6>
                    <p className="m-0 mb-2">Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => remove(product._id)}
                  className="border-0 rounded bg-dark text-white px-2"
                >
                  X
                </button>
              </div>
            ))}
        </div>
        <div className="col-12 col-md-4 col-lg-4 text-center py-5">
          <h5>Total Items {quantity}</h5>
          <h5>Total Price: ${price}</h5>
          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_PROMISE_KEY}
            token={payNow}
            name="GpuShop"
            image={logo}
            amount={price * 100}
          >
            <button
              disabled={wait}
              className="my-1 mb-3 border-0 rounded bg-dark text-white px-3 py-1"
            >
              Proceed to Pay
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default Pay;
