import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../AuthProvider/useAuth';

const Myorders = () => {
    const {user} = useAuth()
    const [orders,setorders] = useState([])
    const loadData = ()=>{
        axios.get(`https://salty-spire-32816.herokuapp.com/myorders/${user.email}`)
        .then(res=>setorders(res.data))
    }

    useEffect(()=>{
        loadData()
    },[])


    const cancel = id =>{
        const confirmation  = window.confirm('Are you sure?')
        if(confirmation){
            axios.delete(`https://salty-spire-32816.herokuapp.com/delateorder/${id}`)
        .then(res=>{
            if(res.data.deletedCount){
                loadData();
                alert('order successfully cancelled')
            }
        })
        }
    }

    return (
        <div>
            <h1 className='connect-h1 m-0 text-center text-white'>Your Orders</h1>
            {
                orders.length===0 && <p className='text-center mt-5'>You dont have any placed orders</p>
            }
            {
              orders.map(order=> <div key={order._id} className="border-bottom text-center pb-2">
                  <img className='pr-img' src={order.img} alt="" />
                  <h4>{order.name}</h4>
                  <h5>Quantity: {order.quantity}</h5>
                  {
                      order.status==='pending' && <h5 className='status1'>Order Status: {order.status}</h5>
                  }
                  {
                      order.status==='Approved' && <h5 className='status2'>Order Status: {order.status}</h5>
                  }
                  <button onClick={()=>cancel(order._id)} className='cancel'>Cancel Order</button>
              </div> )  
            }
        </div>
    );
};

export default Myorders;