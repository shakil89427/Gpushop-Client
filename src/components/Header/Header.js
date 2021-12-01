import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="">
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <NavLink className="text-decoration-none text-dark" to="/">
            <h1 className="d-inline fw-bolder m-0">
              <img
                className="w-25"
                src="https://static.thenounproject.com/png/217781-200.png"
                alt=""
              />
              GPUsHOP
            </h1>
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="text-center ms-auto">
              <NavLink to="/home">
                <button className="m-1 shadow border-0 rounded fw-bold bg-white px-3 py-1">
                  Home
                </button>
              </NavLink>
              <NavLink to="/allproducts">
                <button className="m-1 shadow border-0 rounded fw-bold bg-white px-3 py-1">
                  All Products
                </button>
              </NavLink>
              {user.email && (
                <NavLink to="/dashboard">
                  <button className="m-1 shadow border-0 rounded fw-bold bg-white px-3 py-1">
                    Dashboard
                  </button>
                </NavLink>
              )}
              {user.email ? (
                <Nav.Link className="p-0">
                  <button
                    onClick={logout}
                    className="m-1 shadow border-0 rounded fw-bold bg-white px-3 py-1"
                  >
                    Logout
                  </button>
                </Nav.Link>
              ) : (
                <span>
                  <NavLink to="/login">
                    <button className="m-1 shadow border-0 rounded fw-bold bg-white px-3 py-1">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button className="m-1 shadow border-0 rounded fw-bold bg-white px-3 py-1">
                      Signup
                    </button>
                  </NavLink>
                </span>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {user.displayName && (
        <p className="text-center">Hello: {user.displayName}</p>
      )}
    </div>
  );
};

export default Header;
