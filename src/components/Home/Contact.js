import React from "react";

const Contact = () => {
  return (
    <div className="mt-5 row">
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
        <div className="x-3">
          <input
            className="w-100 mb-2 shadow rounded border-0 p-1"
            placeholder="Your Name"
            type="text"
          />
          <input
            className="w-100 mb-2 shadow rounded border-0 p-1"
            placeholder="Your Email"
            type="number"
          />
          <input
            className="w-100 mb-2 shadow rounded border-0 p-1"
            placeholder="Subject"
            type="email"
          />
          <textarea
            placeholder="Your Message"
            className="w-100 mb-2 shadow rounded border-0 p-1"
            rows="4"
          ></textarea>
          <br />
          <button className="mt-1 border-0 rounded bg-dark w-50 text-white px-3 py-1">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
