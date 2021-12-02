import React from "react";

const Best = () => {
  return (
    <div className="text-white text-center row container mx-auto my-3 p-0">
      <div className="bg-dark col-12 col-md-4 col-lg-4 mb-2 rounded">
        <h2>Consumer Support</h2>
        <p>Find support for products such as:</p>
        <li>GeForce Graphics Cards</li>
        <li>GeForce NOW</li>
        <li>NVIDIA SHIELD</li>
      </div>
      <div className="bg-dark col-12 col-md-4 col-lg-4 rounded mb-2">
        <h2>Enterprise Support</h2>
        <p>Find support for enterprise-level products such as:</p>
        <li>NVIDIA DGX™ systems</li>
        <li>Virtual GPU (vGPU) solutions</li>
        <li>NGC-Ready™ servers</li>
      </div>
      <div className="bg-dark col-12 col-md-4 col-lg-4 rounded mb-2">
        <h2>Networking Support</h2>
        <p>Find support for Networking products such as:</p>
        <li>Data Processing Unit (DPU)</li>
        <li>InfiniBand and Ethernet Adapters</li>
        <li>InfiniBand and Ethernet Switches</li>
      </div>
    </div>
  );
};

export default Best;
