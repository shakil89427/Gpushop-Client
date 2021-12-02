import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spinner } from "react-bootstrap";

const Reviews = () => {
  const [reviews, setreviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://salty-spire-32816.herokuapp.com/allreviews")
      .then((res) => setreviews(res.data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1500,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          autoplaySpeed: 4000,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 3500,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          autoplaySpeed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-5 border-top border-5 shadow-lg ">
      <h2 className="text-center mx-auto">Reviews</h2>
      <hr className="w-25 pb-1 mx-auto rounded mt-0 " />
      {reviews.length === 0 ? (
        <div className="mt-5 text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Slider {...settings} className="text-center px-3">
          {reviews.map((review) => (
            <div key={review._id} className="px-3">
              <h5>{review.username}</h5>
              {review.feedback.length > 200 ? (
                <p>{review.feedback.slice(0, 200)}....</p>
              ) : (
                <p>{review.feedback}</p>
              )}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Reviews;
