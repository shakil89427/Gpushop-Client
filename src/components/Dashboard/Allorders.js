import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Allorders = () => {
    const [orders, setorders] = useState([])

    const loadData = ()=>{
        axios.get('http://localhost:5000/allorders')
        .then(res=>setorders(res.data))
    }

    useEffect(()=>{
        loadData()
    },[])

    const changestatus=id=>{
        axios.post(`http://localhost:5000/changestatus/${id}`)
        .then(res=>{
            if(res.data.modifiedCount){
                loadData()
            }
        })
    };

    const cancelorder=id=>{
        const confirmation = window.confirm('Are you Sure')
        if(confirmation){
            axios.delete(`http://localhost:5000/delateorder/${id}`)
        .then(res=>{
            if(res.data.deletedCount){
                loadData()
                alert("Order Successfully Cancelled")
            }
        })
        }
    }

    return (
        <div>
            <h1 className='connect-h1 text-center text-white'>All Orders</h1>
            {
                orders.length===0 && <p className='text-center mt-5'>No Orders Placed</p>
            }
            <div className='all'>
            {
               orders.map(order=> <div key={order._id} className="allpd d-flex flex-column justify-content-between border p-2 border-2 text-center mb-2">
                   <span><img className='mx-auto pr-img' src={order.img} alt="" />
                   <p>{order.name}</p></span>
                   <span><h6>Quantity: {order.quantity}</h6> <small>Ordered By: {order.useremail}</small> </span>
                   <div className="">
                   {
                       order.status==='pending' && <button onClick={()=>changestatus(order._id)} className='pending'>{order.status}</button>
                   }
                   {
                       order.status==='Approved' && <button className='approved text-white'>{order.status}</button>
                   }
                   <button onClick={()=>cancelorder(order._id)} className='delate text-white'>Cancel</button>
                   </div>
               </div> ) 
            }
        </div>
        </div>
    );
};

export default Allorders;