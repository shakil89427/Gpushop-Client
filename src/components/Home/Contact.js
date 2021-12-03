import React from "react";
import emailjs from "emailjs-com";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [wait, setWait] = useState(false);

  /* Send email function start */
  const sendEmail = (e) => {
    e.preventDefault();
    setWait(true);
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_NAME,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        e.target,
        process.env.REACT_APP_EMAILJS_UID
      )
      .then(
        (result) => {
          if (result) {
            e.target.reset();
            setWait(false);
            toast.success("Message Successfully Sended", {
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
        },
        (error) => {
          setWait(false);
        }
      );
  };
  /* Send email function End */

  return (
    <div className="mt-5 row">
      <ToastContainer />
      <h1 className="text-center">Looking to Find Out More?</h1>
      <div className="col-12 col-md-7 col-lg-8 mb-3">
        <div className="p-3 shadow rounded text-center">
          <h5>
            If you have any questions about us or the product we offer, please
            get in touch. We’re always happy to hear from you, however, you
            choose to contact us. Simply fill in the form or get in touch via
            the following options:
          </h5>
          <h4>Email: info@gpushop.com</h4>
          <p className="m-0">Address:</p>
          <p>
            4097 Friendship Lane <br />
            Santa Clara <br />
            California <br />
            95054
          </p>
        </div>
      </div>

      <div className="text-center col-12 col-md-5 col-lg-4">
        <form onSubmit={sendEmail}>
          <input
            name="name"
            required
            className="w-100 mb-2 shadow rounded border-0 p-1"
            placeholder="Your Name"
            type="text"
          />
          <input
            name="email"
            required
            className="w-100 mb-2 shadow rounded border-0 p-1"
            placeholder="Your Email"
            type="email"
          />
          <input
            name="subject"
            className="w-100 mb-2 shadow rounded border-0 p-1"
            placeholder="Subject"
            type="text"
          />
          <textarea
            required
            name="messages"
            placeholder="Your Message"
            className="w-100 mb-2 shadow rounded border-0 p-1"
            rows="4"
          ></textarea>
          <br />
          {wait ? (
            <Spinner animation="border" />
          ) : (
            <button
              type="submit"
              className="mt-1 border-0 rounded bg-dark w-50 text-white px-3 py-1"
            >
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
