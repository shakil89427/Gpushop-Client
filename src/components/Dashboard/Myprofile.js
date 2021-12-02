import React from "react";
import useAuth from "../AuthProvider/useAuth";

const Myprofile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-center">Your Profile</h1>
      <hr className="w-25 pb-1 mx-auto rounded mt-0" />
      <div className="text-center">
        <h5>Name: {user.displayName}</h5>
        <h5>Email: {user.email}</h5>
        <h5>Role: {user.role}</h5>
        <h5>Uid: {user.uid}</h5>
        <h5>ApiKey: {user.apiKey}</h5>
      </div>
    </div>
  );
};

export default Myprofile;
