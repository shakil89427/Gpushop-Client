import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const LaitestProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/allproducts").then((res) => {
      const data = res.data;
      const newData = data.slice(2, 8);
      setProducts(newData);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center mt-2 connect-h1 text-white p-1">
        Laitest Products
      </h1>
      <div className="allproducts">
        {products.map((product) => (
          <div className="product d-flex flex-column justify-content-between" key={product._id}>
            <div className="text-center">
            <img className="pr-img" src={product.img} alt="" />
            <h5>{product.name}</h5>
            
            </div>
              <div className="text-center">
              <h5 className='text-danger'>Price: ${product.price}</h5>
              <NavLink to={`/productdetails/${product._id}`}><button className='buy-btn'>More Details & Buy</button></NavLink>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaitestProducts;
