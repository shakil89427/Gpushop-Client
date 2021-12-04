import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import logo from "../../images/headerLogo.png";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="">
      <Navbar className="bg-dark" collapseOnSelect expand="lg">
        <Container>
          <div className="d-flex align-items-center">
            <img
              style={{ width: "15%" }}
              className="bg-white rounded-circle"
              src={logo}
              alt=""
            />
            <NavLink className="text-decoration-none text-white" to="/">
              <h2 className="ms-2">
                <em>GPUsHOP</em>
              </h2>
            </NavLink>
          </div>
          <Navbar.Toggle
            className="px-1 py-0 bg-white"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="flex-row justify-content-center ms-auto">
              <NavLink to="/home">
                <button className="m-1 border-0 rounded fw-bold bg-white">
                  Home
                </button>
              </NavLink>
              <NavLink to="/allproducts">
                <button className="m-1 border-0 rounded fw-bold bg-white">
                  All Products
                </button>
              </NavLink>
              {user.email && (
                <NavLink to="/dashboard/myprofile">
                  <button className="m-1 border-0 rounded fw-bold bg-white">
                    Dashboard
                  </button>
                </NavLink>
              )}
              {user.email ? (
                <Nav.Link className="p-0">
                  <button
                    onClick={logout}
                    className="m-1 border-0 rounded fw-bold bg-white"
                  >
                    Logout
                  </button>
                </Nav.Link>
              ) : (
                <span>
                  <NavLink to="/login">
                    <button className="m-1 border-0 rounded fw-bold bg-white">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button className="m-1 border-0 rounded fw-bold bg-white">
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
