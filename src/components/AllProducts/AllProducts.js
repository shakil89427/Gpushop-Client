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
        <div className='all w-75 mx-auto'>
            {
               products.map(product=> <div key={product._id} className="allpd d-flex flex-column justify-content-between border p-2 border-2 text-center">
                   <img className='mx-auto pr-img' src={product.img} alt="" />
                   <p>{product.description}</p>
                   <h6>Price: ${product.price}</h6>
                   <NavLink to={`/productdetails/${product._id}`}><button className='buy-btn'>More Details & Buy</button></NavLink>
               </div> ) 
            }
        </div>
    );
};

export default AllProducts;