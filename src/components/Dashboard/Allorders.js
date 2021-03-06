import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Allorders = () => {
  const [orders, setorders] = useState([]);
  const [wait, setWait] = useState(false);

  /* Load data from server */
  const loadData = () => {
    axios.get("https://gpushop.herokuapp.com/allorders").then((res) => {
      setorders(res.data);
      setWait(false);
    });
  };

  useEffect(() => {
    setWait(true);
    loadData();
  }, []);

  /* Change pending to Approve status */
  const changestatus = (id) => {
    axios
      .post(`https://gpushop.herokuapp.com/changestatus/${id}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          loadData();
          toast.success("Order Approved", {
            position: "top-center",
            autoClose: 2000,
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

  /* Cancel an order function */
  const cancelorder = (id) => {
    const confirmation = window.confirm("Are you Sure");
    if (confirmation) {
      axios
        .delete(`https://gpushop.herokuapp.com/delateorder/${id}`)
        .then((res) => {
          if (res.data.deletedCount) {
            loadData();
            toast.success("Order Successfully Cancelled", {
              position: "top-center",
              autoClose: 2000,
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
    <div>
      <ToastContainer />
      <h1 className="text-center">All Orders</h1>

      <hr className="w-50 mx-auto pb-1" />
      <p className="text-center">Click on pending button to make Approve</p>
      {wait && (
        <div className="mt-3 text-center">
          <Spinner animation="border" />
        </div>
      )}
      {orders.length === 0 && (
        <p className="text-center mt-5">No Orders Placed</p>
      )}
      <div className="row">
        {orders.map((order) => (
          <div
            key={order._id}
            className="col-6 col-md-4 col-lg-3 d-flex flex-column justify-content-between text-center"
          >
            <span>
              <img className="mx-auto pr-img" src={order.img} alt="" />
              <p>{order.name}</p>
            </span>
            <span>
              <h6>Quantity: {order.quantity}</h6>{" "}
              <small>Ordered By: {order.useremail}</small>{" "}
            </span>
            <div className="">
              {order.status === "pending" && (
                <button
                  onClick={() => changestatus(order._id)}
                  className="m-1 border-0 rounded bg-warning text-white px-3 py-1"
                >
                  {order.status}
                </button>
              )}
              {order.status === "Approved" && (
                <button className="m-1 border-0 rounded bg-success text-white px-3 py-1">
                  {order.status}
                </button>
              )}
              <button
                onClick={() => cancelorder(order._id)}
                className="m-1 border-0 rounded bg-dark text-white px-3 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allorders;
