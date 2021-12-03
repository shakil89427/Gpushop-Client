import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRemoveProduct = () => {
  const [products, setProducts] = useState([]);
  let [data, setdata] = useState({});
  const [wait, setWait] = useState(false);
  const [add, setAdd] = useState(false);

  /* Load data from server */
  const loadData = () => {
    axios
      .get("https://salty-spire-32816.herokuapp.com/allproducts")
      .then((res) => {
        setProducts(res.data);
        setWait(false);
      });
  };

  useEffect(() => {
    setWait(true);
    loadData();
  }, []);

  /* Get data from inputes value */
  const handleBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...data };
    newData[field] = value;
    setdata(newData);
  };

  /* Add product function */
  const addproduct = (e) => {
    setAdd(true);
    e.preventDefault();
    axios
      .post("https://salty-spire-32816.herokuapp.com/addproduct", data)
      .then((res) => {
        if (res.data.insertedId) {
          loadData();
          e.target.reset();
          toast.success("Product Added", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
            transition: Slide,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
        setAdd(false);
      });
  };

  /* Remove product function */
  const removepd = (id) => {
    const confirmation = window.confirm("Are You Sure?");
    if (confirmation) {
      axios
        .delete(`https://salty-spire-32816.herokuapp.com/delateproduct/${id}`)
        .then((res) => {
          if (res.data.deletedCount) {
            loadData();
            toast.success("Product Successfully Removed", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              theme: "colored",
              transition: Slide,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center">Add or remove products</h1>
      <hr />
      <div className="row container mx-auto">
        {/* Add product Start */}
        <div className="col-12 col-md-4 col-lg-3 text-center px-2">
          <h3>Add a product</h3>
          <hr className="w-50 mx-auto pb-1" />
          <form onSubmit={addproduct}>
            <input
              onBlur={handleBlur}
              className="w-100 border-0 shadow px-3 rounded py-1 my-2"
              required
              type="text"
              name="name"
              id=""
              placeholder="Product Name"
            />

            <input
              onBlur={handleBlur}
              className="w-100 border-0 shadow px-3 rounded py-1 my-2"
              required
              type="text"
              name="img"
              id=""
              placeholder="Product Image Link"
            />

            <input
              onBlur={handleBlur}
              className="w-100 border-0 shadow px-3 rounded py-1 my-2"
              required
              type="number"
              name="price"
              id=""
              placeholder="Product Price"
            />

            <textarea
              className="w-100 border-0 shadow px-3 rounded py-1 my-2"
              onBlur={handleBlur}
              required
              name="description"
              placeholder="Product Details"
              rows="4"
            ></textarea>
            {add ? (
              <div className="m-1 text-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <button
                className="m-1 border-0 rounded bg-dark text-white px-3 py-1"
                type="submit"
              >
                Add To List
              </button>
            )}
          </form>
        </div>
        {/* Add product End */}

        {/* Remove Product Start */}
        <div className="col-12 col-md-8 col-lg-9">
          <h3 className="text-center">Remove Product: {products.length}</h3>
          <hr className="w-50 mx-auto pb-1" />
          {wait && (
            <div className="mt-3 text-center">
              <Spinner animation="border" />
            </div>
          )}
          {products.map((product) => (
            <div
              key={product._id}
              className="d-flex align-items-center mb-2 pb-1 border-bottom"
            >
              <img className="pr-img me-2" src={product.img} alt="" />
              <div className="">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <button
                  onClick={() => removepd(product._id)}
                  className="m-1 border-0 rounded bg-dark text-white px-3 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Remove Product End */}
      </div>
    </div>
  );
};

export default AddRemoveProduct;
