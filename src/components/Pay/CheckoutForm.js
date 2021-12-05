import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const CheckoutForm = ({ price, data, loadData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [wait, setWait] = useState(false);

  /* Payment function Start */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true);

    if (!stripe || !elements) {
      return setWait(false);
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      setWait(false);
      console.log(error.message);
      return toast.error(error.message, {
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
    const { id } = paymentMethod;

    try {
      const result = await axios.post(
        "https://gpushop.herokuapp.com/create-payment-intent",
        { id, price, data }
      );
      if (result.data.deletedCount) {
        loadData();
        setWait(false);
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
    } catch (err) {
      setWait(false);
      toast.error(err.message, {
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
  /* Payment function End */

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {wait ? (
        <Spinner className="mt-5 float-end me-4" animation="border" />
      ) : (
        <button
          className="mt-5 me-2 float-end border-0 rounded bg-dark text-white px-3 py-1"
          type="submit"
          disabled={!stripe || data.length === 0}
        >
          Pay ${price}
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
