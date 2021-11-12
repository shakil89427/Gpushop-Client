import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../AuthProvider/useAuth';

const Myorders = () => {
    const {user} = useAuth()
    const [orders,setorders] = useState([])

    const loadData = ()=>{
        axios.get(`http://localhost:5000/myorders/${user.email}`)
        .then(res=>{
            if(res.data.length>0){
                setorders(res.data)
            }
        })
    }

    useEffect(()=>{
        loadData()
    },[])


    const cancel = id =>{
        const confirmation  = window.confirm('Are you sure?')
        if(confirmation){
            axios.delete(`http://localhost:5000/delateorder/${id}`)
        .then(res=>{
            if(res.data.deletedCount){
                loadData()
                alert('order successfully cancelled')
            }
        })
        }
    }

    return (
        <div>
            <h1 className='connect-h1 m-0 text-center text-white'>Your Orders</h1>
            {
              orders.map(order=> <div key={order._id} className="border-bottom text-center pb-2">
                  <img className='pr-img' src={order.img} alt="" />
                  <h4>{order.name}</h4>
                  <h5>Quantity: {order.quantity}</h5>
                  {
                      order.status==='pending' && <h6 className='text-warning'>Order Status: {order.status}</h6>
                  }
                  {
                      order.status==='approved' && <p className='text-success'>Order Status: {order.status}</p>
                  }
                  <button onClick={()=>cancel(order._id)} className='cancel'>Cancel Order</button>
              </div> )  
            }
        </div>
    );
};

export default Myorders;