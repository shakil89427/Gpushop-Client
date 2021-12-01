import React from "react";
import Banner from "./Banner";
import LaitestProducts from "./LaitestProducts";
import ReviewNews from "./ReviewNews";
import Upcoming from "./Upcoming";

const Home = () => {
  return (
    <div className="container mt-2">
      <Banner></Banner>
      <LaitestProducts></LaitestProducts>
      <Upcoming></Upcoming>
      <ReviewNews></ReviewNews>
    </div>
  );
};

export default Home;
