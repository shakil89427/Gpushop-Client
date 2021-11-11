import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import useAuth from '../AuthProvider/useAuth';
import { NavLink } from 'react-router-dom';

const ProductDetails = () => {
    const [product,setProduct] = useState({})
    const [redirect,setredirect] = useState(false)
    const [review,setreview] = useState('')
    const {id} = useParams();
    const {user} = useAuth()

    useEffect(()=>{
        axios.get(`http://localhost:5000/details/${id}`)
        .then(res=>setProduct(res.data))
    },[])

    const addToCart = () =>{
            product.userId = user.uid;
            axios.post('http://localhost:5000/addtocart',product)
            .then(res=> {
                if(res.data.acknowledged){
                    alert('Successfully added to cart')
                    setredirect(true)
                }
            })
    }

    const handleBlur= e =>{
        setreview(e.target.value)
    }

    const addreview = e =>{
        e.preventDefault()
        const info = {username:user.displayName,feedback:review}
        axios.post('http://localhost:5000/addreview',info)
        .then(res=>{
            if(res.data.acknowledged){
                alert('Review Successfully Added')
                e.target.reset()
            }
        })
    }

    return (
        <div className='w-50 mx-auto text-center my-5'>
            <img className='single-img' src={product.img} alt="" />
            <h2 className='text-success'>{product.name}</h2>
            <h5>{product.description}</h5>
            <h4 className='text-danger'>Price: ${product.price}</h4>
            <button onClick={addToCart} className='s-btn'>Add to Cart</button> <br />
            {
                redirect&& <NavLink to='/pay'><button className='s-btn'>Procced to Pay</button></NavLink>
            }
            <form onSubmit={addreview}>
                <h5 className='mt-5'>Write a review</h5>
                <textarea onBlur={handleBlur} required cols="50" rows="5"></textarea>
                <br />
                <button type='submit' className='s-btn'>Submit</button>
            </form>
        </div>
    );
};

export default ProductDetails;