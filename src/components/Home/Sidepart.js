import axios from "axios";
import React, { useEffect, useState } from "react";

const Sidepart = () => {

  const data = [
    {
        name:'Shakil',
        review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi sit fugit aliquam quasi rem totam tenetur ipsum mollitia iure, odit libero ab consequatur blanditiis voluptatem quos atque ullam eveniet neque?',
        rating: 5
    },
    {
        name:'Ahmed',
        review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi sit fugit aliquam quasi rem totam tenetur ipsum mollitia iure, odit libero ab consequatur blanditiis voluptatem quos atque ullam eveniet neque?',
        rating: 5
    },
    {
        name:'Ahmed',
        review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi sit fugit aliquam quasi rem totam tenetur ipsum mollitia iure, odit libero ab consequatur blanditiis voluptatem quos atque ullam eveniet neque?',
        rating: 5
    },
    {
        name:'Ahmed',
        review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi sit fugit aliquam quasi rem totam tenetur ipsum mollitia iure, odit libero ab consequatur blanditiis voluptatem quos atque ullam eveniet neque?',
        rating: 5
    },
    {
        name:'Ahmed',
        review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi sit fugit aliquam quasi rem totam tenetur ipsum mollitia iure, odit libero ab consequatur blanditiis voluptatem quos atque ullam eveniet neque?',
        rating: 5
    },
    {
        name:'Ahmed',
        review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi sit fugit aliquam quasi rem totam tenetur ipsum mollitia iure, odit libero ab consequatur blanditiis voluptatem quos atque ullam eveniet neque?',
        rating: 5
    },
]
  const [upcoming,setUpcoming]= useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/upcoming')
    .then(res=>setUpcoming(res.data))
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
                    data.map(review=> <div className="p-2 text-center mx-2 border-bottom">
                        <h4>{review.name}</h4>
                        <h6>{review.review}</h6>
                        <h5>{review.rating}</h5>
                    </div> )
                }
            </div>
        </div>
    </div>
  );
};

export default Sidepart;
