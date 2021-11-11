import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
    axios.get("http://localhost:5000/allproducts")
    .then((res) => setProducts(res.data));
  }, []);
    return (
        <div>
            {
               products.map(product=> <div key={product._id} className="w-50 mx-auto text-center my-5">
                   <img className='pr-img' src={product.img} alt="" />
                   <p>{product.description}</p>
                   <NavLink to={`/productdetails/${product._id}`}><button className='buy-btn'>More Details & Buy</button></NavLink>
               </div> ) 
            }
        </div>
    );
};

export default AllProducts;