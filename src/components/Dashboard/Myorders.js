import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import useAuth from "../AuthProvider/useAuth";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myorders = () => {
  const { user } = useAuth();
  const [orders, setorders] = useState([]);
  const [wait, setWait] = useState(false);

  /* Load data from server */
  const loadData = () => {
    axios
      .get(`https://gpushop.herokuapp.com/myorders/${user.email}`)
      .then((res) => {
        setWait(false);
        setorders(res.data);
      });
  };

  useEffect(() => {
    setWait(true);
    loadData();
  }, []);

  /* Cancel order function */
  const cancel = (id) => {
    const confirmation = window.confirm("Are you sure?");
    if (confirmation) {
      axios
        .delete(`https://gpushop.herokuapp.com/delateorder/${id}`)
        .then((res) => {
          if (res.data.deletedCount) {
            loadData();
            toast.success("Order Successfully cancelled", {
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
      <h1 className="text-center">Your Orders</h1>
      <hr className="w-25 pb-1 mx-auto rounded mt-0" />
      {wait && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {orders.length === 0 && (
        <p className="text-center mt-5">You dont have any placed orders</p>
      )}
      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-12 col-md-6 col-lg-4 p-1">
            <div className="text-center shadow rounded p-2">
              <img className="w-25" src={order.img} alt="" />
              <h5>{order.name}</h5>
              <h6>Quantity: {order.quantity}</h6>

              {order.status === "pending" && (
                <p className="status1">Order Status: {order.status}</p>
              )}

              {order.status === "Approved" && (
                <p className="status2">Order Status: {order.status}</p>
              )}
              <button
                onClick={() => cancel(order._id)}
                className="m-1 border-0 rounded bg-dark text-white px-3 py-1"
              >
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorders;
