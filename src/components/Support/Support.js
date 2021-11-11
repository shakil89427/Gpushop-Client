import React from 'react';

const Support = () => {
    return (
        <div className='w-75 d-flex align-items-center justify-content-between mx-auto my-5 py-5'>
            <div>
                <h2>Consumer Support</h2>
                <p>Find support for products such as:</p>
                <li>GeForce  Graphics Cards</li>
                <li>GeForce NOW</li>
                <li>NVIDIA SHIELD</li>
            </div>
            <div>
                <h2>Enterprise Support</h2>
                <p>Find support for enterprise-level products such as:</p>
                <li>NVIDIA DGX™ systems</li>
                <li>Virtual GPU (vGPU) solutions</li>
                <li>NGC-Ready™ servers</li>
            </div>
            <div>
                <h2>Networking Support</h2>
                <p>Find support for Networking products such as:</p>
                <li>Data Processing Unit (DPU)</li>
                <li>InfiniBand and Ethernet Adapters</li>
                <li>InfiniBand and Ethernet Switches</li>
            </div>
        </div>
    );
};

export default Support;