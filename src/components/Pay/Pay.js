import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../AuthProvider/useAuth';

const Pay = () => {
    const [products,setProducts] = useState([])
    const [price,setprice] = useState()
    const [quantity,setquantity] = useState()
    const {user} = useAuth();

    const loadData = () =>{
        axios.get(`http://localhost:5000/allcart/${user.uid}`)
        .then(res=>setProducts(res.data))
    };
    const calculate = () =>{
        let gprice = 0;
        let gquantity = 0;
        for(const product of products){
            const newprice = product.price*product.quantity
            gprice=gprice+newprice
            gquantity=gquantity+product.quantity
        }
        setprice(gprice)
        setquantity(gquantity)
    };
    useEffect(()=>{
        loadData()
    },[]);

    useEffect(()=>{
        calculate()
    },[products]);

    const remove = id =>{
        axios.delete(`http://localhost:5000/deletefromcart/${id}?uid=${user.uid}`)
        .then(res=>{
            if(res.data.deletedCount){
                loadData()
            }
        })
    }
    return (
        <div className='w-75 mx-auto my-3'>
            <h1 className='connect-h1 text-white text-center'>Checkout</h1>
            <div className="row ">
                <div className="col-8 py-5">
                    {
                        products.length===0 && <p className='text-center text-danger'>You dont have added any product</p>
                    }
                    {
                        products.map(product=> <div key={product._id} className="me-5 border-bottom d-flex align-items-center">
                            <img className='pay-img' src={product.img} alt="" />
                            <div className="ms-2">
                            <h4>{product.name}</h4>
                            <h5>Quantity: {product.quantity}</h5>
                            <h5>Price: {product.price}</h5>
                            <button onClick={()=>remove(product._id)} className='s-btn'>Remove</button>
                            </div>
                        </div> )
                    }
                </div>
                <div className="col-4 text-center py-5">
                    <h5>Total Price: {price}</h5>
                    <h5>Total Items: {quantity}</h5>
                    <button className='s-btn'>Place order</button>
                </div>
            </div>
        </div>
    );
};

export default Pay;