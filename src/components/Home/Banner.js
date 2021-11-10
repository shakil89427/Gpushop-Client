import React from "react";

const Banner = () => {
  return (
    <div className=" banner d-flex justify-content-around align-items-center">
      <form className="mx-auto banner-form w-50">
        <input className="banner-input" type="text" />
        <button className="banner-btn">Search</button>
      </form>
    </div>
  );
};

export default Banner;
