import axios from "axios";
import React, { useEffect, useState } from "react";

const Sidepart = () => {
  const [reviews,setreviews] = useState([])
  const [upcoming,setUpcoming]= useState([])

  useEffect(()=>{
    axios.get('https://salty-spire-32816.herokuapp.com/upcoming')
    .then(res=>setUpcoming(res.data))
  },[])

  useEffect(()=>{
    axios.get('https://salty-spire-32816.herokuapp.com/allreviews')
    .then(res=>setreviews(res.data))
  },[])


  return (
    // CONNECT WITH US
    <div className="col-4">
      <h1 className="text-center text-white connect-h1 p-1">Connect with us</h1>
      <div className="icons container d-flex justify-content-around my-5">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin-in"></i>
      </div>

      {/* UPCOMING PRODUCTS */}
      <div className="">
        <h1 className="text-center text-white connect-h1 p-1">
          Upcoming Products
        </h1>
        <div className="upcoming">
        {
         upcoming.map(product=><div className='d-flex align-items-center border-bottom' key={product._id}>
           <img className='up-img' src={product.img} alt="" />
           <h6>{product.name}</h6>
         </div>) 
        }
        </div>
      </div>

      {/* REVIEWS */}
      <div>
            <h1 className='text-center mt-4 mx-auto connect-h1 text-white'>Reviews</h1>
            <div className="review-div mx-auto my-3">
                {
                    reviews.map(review=> <div key={review._id} className="p-2 text-center mx-2 border-bottom">
                        <h4>{review.username}</h4>
                        <h6>{review.feedback}</h6>
                    </div> )
                }
            </div>
        </div>
    </div>
  );
};

export default Sidepart;
