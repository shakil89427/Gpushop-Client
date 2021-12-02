import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import logo from "./logo.png";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="">
      <Navbar className="bg-dark" collapseOnSelect expand="lg">
        <Container>
          <NavLink className="text-decoration-none text-dark" to="/">
            <div className="d-flex align-items-center text-white fw-bolder m-0">
              <img
                style={{ width: "20%" }}
                className="bg-white my-0 me-2 rounded-circle"
                src={logo}
                alt=""
              />
              <div>
                <h1 className="m-0">
                  <em>GPUsHOP</em>
                </h1>

                {user.displayName && (
                  <small className="fw-light m-0 p-0">
                    Hello: {user.displayName}
                  </small>
                )}
              </div>
            </div>
          </NavLink>
          <Navbar.Toggle
            className="px-1 py-0 bg-white"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="text-center ms-auto">
              <NavLink to="/home">
                <button className="m-1 border-0 rounded fw-bold bg-white px-3 py-1">
                  Home
                </button>
              </NavLink>
              <NavLink to="/allproducts">
                <button className="m-1 border-0 rounded fw-bold bg-white px-3 py-1">
                  All Products
                </button>
              </NavLink>
              {user.email && (
                <NavLink to="/dashboard">
                  <button className="m-1 border-0 rounded fw-bold bg-white px-3 py-1">
                    Dashboard
                  </button>
                </NavLink>
              )}
              {user.email ? (
                <Nav.Link className="p-0">
                  <button
                    onClick={logout}
                    className="m-1 border-0 rounded fw-bold bg-white px-3 py-1"
                  >
                    Logout
                  </button>
                </Nav.Link>
              ) : (
                <span>
                  <NavLink to="/login">
                    <button className="m-1 border-0 rounded fw-bold bg-white px-3 py-1">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button className="m-1 border-0 rounded fw-bold bg-white px-3 py-1">
                      Signup
                    </button>
                  </NavLink>
                </span>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
