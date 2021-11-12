import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddRemoveProduct = () => {
    const [products, setProducts] = useState([]);
    let [data,setdata] = useState({})

    const loadData= () =>{
        axios.get("http://localhost:5000/allproducts")
        .then((res) => setProducts(res.data));
    }

    useEffect(() => {
        loadData()
  }, []);

  const handleBlur = e =>{
        const field = e.target.name
        const value = e.target.value
        const newData = {...data}
        newData[field] = value
        setdata(newData)
  }
  const addproduct=e=>{
        e.preventDefault()
        axios.post("http://localhost:5000/addproduct",data)
        .then(res=>{
            if(res.data.insertedId){
                loadData()
                alert('Added to List')
                e.target.reset()
            }
        })
  }

  const removepd = id =>{
      const confirmation = window.confirm('Are You Sure?')
      if(confirmation){
        axios.delete(`http://localhost:5000/delateproduct/${id}`)
        .then(res=>{
            if(res.data.deletedCount){
                loadData()
                alert('Product Successfully Removed')
            }
        })
      }
  };

    return (
        <div>
            <h1 className='connect-h1 text-white text-center'>Add or remove products</h1>

            <div className="row">
                <div className="col-7">
                    <h3 className='text-center border-bottom border-3'>Total Product: {products.length}</h3>
                    {
                        products.map(product=> <div key={product._id} className="d-flex align-items-center mb-5 pb-3 border-bottom">
                            <img className='pr-img me-3' src={product.img} alt="" />
                            <div className="">
                                <h5>{product.name}</h5>
                                <p>{product.description}</p>
                                <button onClick={()=>removepd(product._id)} className='remove'>Remove</button>
                            </div>
                        </div> )
                    }
                </div>

                <div className="col-5 text-center">
                    <h2>Add a product</h2>
                    <form onSubmit={addproduct}>
                        <input onBlur={handleBlur} className='addinput' required type="text" name="name" id="" placeholder='Product Name'/> <br />
                        <input onBlur={handleBlur} className='addinput' required type="text" name="img" id="" placeholder='Product Image Link'/> <br />
                        <input onBlur={handleBlur} className='addinput' required type="number" name="price" id="" placeholder='Product Price'/> <br />
                        <input onBlur={handleBlur} className='addinput' required type="text" name="description" id="" placeholder='Product Details'/> <br />
                        <button className='s-btn' type='submit'>Add To List</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddRemoveProduct;