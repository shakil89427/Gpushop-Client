import React from "react";
import useAuth from "../AuthProvider/useAuth";

const Myprofile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-center">Your Profile</h1>
      <hr className="w-25 pb-1 mx-auto rounded mt-0" />
      <div className="d-flex justify-content-center">
        <div className="d-inline-block">
          <h5 className="m-1">
            Name
            <small className="fw-normal">
              : {user.displayName || user.name}
            </small>
          </h5>

          <h5 className="m-1">
            Email<small className="fw-normal">: {user.email}</small>
          </h5>

          <h5 className="m-1">
            Role<small className="fw-normal">: {user.role}</small>
          </h5>

          <h5 className="m-1">
            Uid<small className="fw-normal">: {user.uid}</small>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
