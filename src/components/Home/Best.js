import React from "react";

const Best = () => {
  return (
    <div className="container mx-auto mb-5 py-5">
      <h1 className="text-center">Why We Best</h1>
      <hr className=" w-25 pb-1 mx-auto rounded mt-0" />
      <div className="row">
        <div className="col-12 col-md-4 col-lg-4 mb-2 px-1">
          <div className="rounded shadow p-2 h-100">
            <h2>Consumer Support</h2>
            <p>Find support for products such as:</p>
            <li>GeForce Graphics Cards</li>
            <li>GeForce NOW</li>
            <li>NVIDIA SHIELD</li>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4 mb-2 px-1">
          <div className="rounded shadow p-2 h-100">
            <h2>Enterprise Support</h2>
            <p>Find support for enterprise-level products such as:</p>
            <li>NVIDIA DGX™ systems</li>
            <li>Virtual GPU (vGPU) solutions</li>
            <li>NGC-Ready™ servers</li>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4 mb-2 px-1">
          <div className="rounded shadow p-2 h-100">
            <h2>Networking Support</h2>
            <p>Find support for Networking products such as:</p>
            <li>Data Processing Unit (DPU)</li>
            <li>InfiniBand and Ethernet Adapters</li>
            <li>InfiniBand and Ethernet Switches</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Best;
