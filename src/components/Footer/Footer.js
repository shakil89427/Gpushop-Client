import React from 'react';

const Footer = () => {
    return (
        <>
        <div className='mt-3 mx-auto text-center footer'>
            <div className="">
                <h4>CONTACT & ABOUT US</h4>
                <p>About</p>
                <p>Contact us</p>
                <p><i className="border-0 mx-1 fab fa-facebook"></i>
                    <i className="border-0 mx-1 fab fa-twitter"></i>
                    <i className="border-0 mx-1 fab fa-instagram"></i>
                    <i className="border-0 mx-1 fab fa-linkedin-in"></i></p>
            </div>

            <div className="">
                <h4>LEGAL</h4>
                <p>Privacy Policy</p>
                <p>Privacy Tools</p>
                <p>Disclaimer</p>
                <h6>Copyright 2021 by GPUSHOP</h6>
            </div>

            <div className="">
                <h4>AFFILIATE DISCLOSURE</h4>
                <p>As an Amazon Associate I earn from qualifying purchases.</p>
                <p>As a Chewy Affiliate I earn from qualifying purchases.</p>
                <p>Importantly, affiliate link disclosures aren’t just a “nice thing” to include on your affiliate site</p>
            </div>
        </div>
        </>
    );
};

export default Footer;