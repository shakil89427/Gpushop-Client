import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

const ProductDetails = () => {
    const [product,setProduct] = useState({})
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/details/${id}`)
        .then(res=>setProduct(res.data))
    },[])
    return (
        <div className='w-50 mx-auto text-center my-5'>
            <img className='single-img' src={product.img} alt="" />
            <h2 className='text-success'>{product.name}</h2>
            <h5>{product.description}</h5>
            <h4 className='text-danger'>Price: ${product.price}</h4>
            <button className='s-btn'>Add to Cart</button>
            <NavLink to={`/pay/${product._id}`}><button className='s-btn'>Procced to Pay</button></NavLink>
        </div>
    );
};

export default ProductDetails;