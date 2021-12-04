import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import useAuth from "../AuthProvider/useAuth";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const CheckoutForm = ({ price, data, loadData }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [wait, setWait] = useState(false);

  /* Payment function Start */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true);

    /* Validating required info */
    if (!stripe || !elements) {
      return setWait(false);
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return setWait(false);
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setWait(false);
      return toast.error(error, {
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

    /* Payment Process Start*/
    axios
      .post("https://gpushop.herokuapp.com/create-payment-intent", { price })
      .then(async (res) => {
        const { paymentIntent, error } = await stripe.confirmCardPayment(
          res.data.clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                email: user.email,
              },
            },
          }
        );
        if (error) {
          setWait(false);
          return toast.error(error, {
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
        } else {
          /* Save to DB  */
          const saveToDb = () => {
            let newData = [];
            data.forEach((singleData) => {
              singleData.paid = "yes";
              singleData.secret = paymentIntent.client_secret;
              singleData.paymentmethod = paymentIntent.payment_method;
              newData.push(singleData);
            });
            axios
              .post("https://gpushop.herokuapp.com/placeorder", newData)
              .then((res) => {
                if (res.data.acknowledged) {
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
              });
          };
          saveToDb();
        }
      });
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
