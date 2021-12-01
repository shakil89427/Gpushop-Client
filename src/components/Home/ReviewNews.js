import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewNews = () => {
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
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mt-3 mx-2 row">
      <div className="col-12 col-md-12 col-lg-6 my-2 mx-auto">
        <div className="border-top h-100 border-5 shadow ">
          <h2 className="text-center mx-auto">All Reviews</h2>
          <hr className="w-25 py-1 mx-auto rounded mt-0 " />
          <Slider {...settings} className="text-center rounded px-3">
            {reviews.map((review) => (
              <div key={review._id} className="review">
                <h5>{review.username}</h5>
                {review.feedback.length > 200 ? (
                  <p>{review.feedback.slice(0, 200)}....</p>
                ) : (
                  <p>{review.feedback}</p>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className=" col-12 col-md-12 col-lg-6 mx-auto my-2 text-center">
        <div className="border-top border-5 shadow">
          <h2 className="text-center">Write a Review</h2>
          <hr className="w-50 py-1 mx-auto rounded mt-0 mb-1" />
          <textarea className="shadow w-75 border-0" rows="3"></textarea>
          <br />
          <button className="my-2 border-0 bg-dark text-white w-25 rounded px-3 py-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewNews;
