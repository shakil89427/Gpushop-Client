import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';

const Pay = () => {
    const [products,setProducts] = useState([])
    const [data,setdata] = useState()
    const [price,setprice] = useState()
    const [quantity,setquantity] = useState()
    const [home,sethome] = useState(false);
    const {user} = useAuth();
    
    // Data Load Function
    const loadData = () =>{
        axios.get(`http://localhost:5000/allcart/${user.uid}`)
        .then(res=>setProducts(res.data))
    };
    useEffect(()=>{
        loadData()
    },[]);

    // Calculate Function
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
        calculate()
    },[products]);

    // Order Modify Function
    const modify =() =>{
        const newdata = [];
        products.map(product=>{
            const {_id,...rest} = product;
            rest.useremail = user.email
            rest.status= 'pending'
            newdata.push(rest)
        })
        setdata(newdata)
    }
    useEffect(()=>{
        modify()
    },[products])
    

    // Remove From Cart
    const remove = id =>{
        const permition = window.confirm('Are u Sure?')
        if(permition){
            axios.delete(`http://localhost:5000/deletefromcart/${id}?uid=${user.uid}`)
            .then(res=>{
            if(res.data.deletedCount){
                loadData()
            }
        })
        }
    }

    // Manage order Place
    const placeorder =()=>{
        if(data.length===0){
            alert('No items Added On cart')
            return
        }
        axios.post('http://localhost:5000/placeorder',data)
        .then(res=>{
            if(res.data.acknowledged){
                alert('Order Successfully Placed')
                sethome(true)
            }
        })
    }
    return (
        <div className=' mx-auto pb-5'>
            <h1 className='connect-h1 text-white text-center'>Checkout</h1>
            <div className="row ">
                <div className="col-8 py-5">
                    {
                        products.length===0 &&<p className='text-center text-danger'>You dont have added any product <br /> <NavLink to='/home'><button className='s-btn'>Back to Home</button></NavLink> </p>
                    }
                    {
                        products.map(product=> <div key={product._id} className="me-5 border-bottom d-flex align-items-center">
                            <img className='pay-img' src={product.img} alt="" />
                            <div className="ms-2">
                            <h4>{product.name}</h4>
                            <h5>Quantity: {product.quantity}</h5>
                            <h5>Price: ${product.price}</h5>
                            <button onClick={()=>remove(product._id)} className='s-btn'>Remove</button>
                            </div>
                        </div> )
                    }
                </div>
                <div className="col-4 text-center py-5">
                    <h5>Total Price: ${price}</h5>
                    <h5>Total Items: {quantity}</h5>
                    <button onClick={placeorder} className='s-btn'>Place order</button>
                </div>
            </div>
            {
                home&& <Navigate to='/home'></Navigate>
            }
        </div>
    );
};

export default Pay;