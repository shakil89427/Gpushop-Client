import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Pay from "./components/Pay/Pay";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/LogReg/Login";
import Signup from "./components/LogReg/Signup";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import AllProducts from "./components/AllProducts/AllProducts";
import Contact from "./components/Contact/Contact";
import Support from "./components/Support/Support";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Header></Header>
    <Routes>

      <Route path="/*" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/support" element={<Support />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/allproducts" element={<AllProducts />}></Route>
      <Route path="/productdetails/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>}></Route>
      <Route path="/pay" element={<PrivateRoute><Pay /></PrivateRoute>}></Route>
      
    </Routes>
    <Footer></Footer>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
