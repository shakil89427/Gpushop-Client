import React from "react";
import Banner from "./Banner";
import Contact from "./Contact";
import LaitestProducts from "./LaitestProducts";
import Reviews from "./Reviews";
import Best from "./Best";
import Upcoming from "./Upcoming";

const Home = () => {
  return (
    <div className="container mt-2">
      <Banner></Banner>
      <LaitestProducts></LaitestProducts>
      <Upcoming></Upcoming>
      <Reviews></Reviews>
      <Best></Best>
      <Contact></Contact>
    </div>
  );
};

export default Home;
