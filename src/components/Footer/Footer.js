import React from "react";

const Footer = () => {
  return (
    <div className="bg-dark mt-3 text-white text-center">
      <div className="container mx-auto py-3 row">
        <div className="mt-2 col-12 col-md-4 col-lg-4">
          <h4>HELP & ABOUT US</h4>
          <p className="mt-3 mb-0">
            <i className="p-1 mx-1 rounded fs-3 fab fa-facebook"></i>
            <i className="p-1 mx-1 rounded fs-3 fab fa-twitter"></i>
            <i className="p-1 mx-1 rounded fs-3 fab fa-instagram"></i>
            <i className="p-1 mx-1 rounded fs-3 fab fa-linkedin-in"></i>
          </p>
        </div>

        <div className="mt-2 col-12 col-md-4 col-lg-4">
          <h4>LEGAL</h4>
          <p className="my-2 fw-light">Privacy Policy</p>
          <p className="my-2 fw-light">Privacy Tools</p>
          <p className="my-2 fw-light">Disclaimer</p>
        </div>

        <div className="mt-2 col-12 col-md-4 col-lg-4">
          <h4>AFFILIATE DISCLOSURE</h4>
          <p className="my-2 fw-light">
            As a Chewy Affiliate I earn from qualifying purchases.
          </p>
          <p className="my-2 fw-light">
            Importantly, affiliate link disclosures aren’t just a “nice thing”
            to include on your affiliate site
          </p>
        </div>
      </div>
      <p className="mb-0 py-2 fw-bold bg-secondary">
        Copyright © 2021 All rights reserved by Shakil Ahmed
      </p>
    </div>
  );
};

export default Footer;
