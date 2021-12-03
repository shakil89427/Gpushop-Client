import React from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router";
import useAuth from "../AuthProvider/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="py-5 my-5 text-center">
        <Spinner animation="border" />
      </div>
    );
  }
  if (!user.email) {
    return <Navigate to="/login" state={{ location }} />;
  }
  return children;
};

export default PrivateRoute;
