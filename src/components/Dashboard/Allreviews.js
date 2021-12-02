import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Allreviews = () => {
  const [reviews, setreviews] = useState([]);
  const [wait, setWait] = useState(false);

  const loadData = () => {
    axios
      .get("https://salty-spire-32816.herokuapp.com/allreviews")
      .then((res) => {
        setreviews(res.data);
        setWait(false);
      });
  };

  useEffect(() => {
    setWait(true);
    loadData();
  }, []);

  const revdelate = (id) => {
    const confirmation = window.confirm("AAre you Sure");
    if (confirmation) {
      axios
        .delete(`https://salty-spire-32816.herokuapp.com/deletereview/${id}`)
        .then((res) => {
          if (res.data.deletedCount) {
            loadData();
            alert("Successfully Deleted");
          }
        });
    }
  };

  return (
    <div>
      <h1 className="text-center">Manage All Reviews</h1>
      <hr className="w-50 mx-auto pb-1" />
      {wait && (
        <div className="mt-3 text-center">
          <Spinner animation="border" />
        </div>
      )}
      <div className="row">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="mb-3 col-6 col-md-4 col-lg-3 d-flex flex-column justify-content-between"
          >
            <div className="">
              <h4 className="text-center border-bottom">{review.username}</h4>
              <small>{review.feedback}</small>
            </div>
            <button
              onClick={() => revdelate(review._id)}
              className="m-1 border-0 rounded bg-dark text-white px-3 py-1"
            >
              Delate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allreviews;
