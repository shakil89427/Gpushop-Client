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
import Dashboard from "./components/Dashboard/Dashboard";
import Mycart from "./components/Dashboard/Mycart";
import Myorders from "./components/Dashboard/Myorders";
import Myprofile from "./components/Dashboard/Myprofile";
import AddRemoveProduct from "./components/Dashboard/AddRemoveProduct";
import Allorders from "./components/Dashboard/Allorders";
import Allreviews from "./components/Dashboard/Allreviews";
import MakeAdmin from "./components/Dashboard/MakeAdmin";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import NotFound from "./components/NotFound/NotFound";
import AddReview from "./components/Dashboard/AddReview";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="allproducts" element={<AllProducts />}></Route>

          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="mycart" element={<Mycart />} />
            <Route path="myorders" element={<Myorders />} />
            <Route path="myprofile" element={<Myprofile />} />
            <Route path="addreview" element={<AddReview />} />
            <Route
              path="addremove"
              element={
                <AdminRoute>
                  <AddRemoveProduct />
                </AdminRoute>
              }
            />
            <Route
              path="allorders"
              element={
                <AdminRoute>
                  <Allorders />
                </AdminRoute>
              }
            />
            <Route
              path="allreviews"
              element={
                <AdminRoute>
                  <Allreviews />
                </AdminRoute>
              }
            />
            <Route
              path="makeadmin"
              element={
                <AdminRoute>
                  <MakeAdmin />
                </AdminRoute>
              }
            />
          </Route>

          <Route
            path="productdetails/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="pay"
            element={
              <PrivateRoute>
                <Pay />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
