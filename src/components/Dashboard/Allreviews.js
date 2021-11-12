import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Allreviews = () => {
    const [reviews,setreviews] = useState([])

    const loadData =()=>{
        axios.get('https://salty-spire-32816.herokuapp.com/allreviews')
        .then(res=>setreviews(res.data))
    }

    useEffect(()=>{
        loadData()
    },[])


    const revdelate=id=>{
        const confirmation = window.confirm('AAre you Sure')
        if(confirmation){
            axios.delete(`https://salty-spire-32816.herokuapp.com/deletereview/${id}`)
        .then(res=>{
            if(res.data.deletedCount){
                loadData()
                alert("Successfully Deleted")
            }
        })
        }
    }

    return (
        <div>
            <h1 className='connect-h1 text-white text-center'>Manage All Reviews</h1>
            <div className="rev">
                {
                    reviews.map(review=> <div key={review._id} className="rev-main d-flex flex-column justify-content-between">
                        <div className="">
                        <h4 className='text-info border-bottom'>{review.username}</h4>
                        <small>{review.feedback}</small>
                        </div>
                        <button onClick={()=>revdelate(review._id)} className='revdelate'>Delate</button>
                    </div> )
                }
            </div>
        </div>
    );
};

export default Allreviews;