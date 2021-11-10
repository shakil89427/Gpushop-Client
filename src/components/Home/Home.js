import React from "react";
import Banner from "./Banner";
import LaitestProducts from "./LaitestProducts";
import Newslatter from "./Newslatter";
import Sidepart from "./Sidepart";

const Home = () => {
  return (
      <div className=" mt-2 mx-auto container row">
        <div className="col-8">
          <Banner></Banner>
          <LaitestProducts></LaitestProducts>
          <Newslatter></Newslatter>
        </div>
        <Sidepart></Sidepart>
      </div>
  );
};

export default Home;
