import React from "react";
import { Spinner } from "react-bootstrap";
import useAuth from "../AuthProvider/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="py-5 my-5 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (user.role === "Admin") {
    return children;
  }
};

export default AdminRoute;
