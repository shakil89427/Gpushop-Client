import React from 'react';

const Contact = () => {
    return (
        <div className="d-flex w-75 mx-auto">
            <div className='w-50'>
                <h1>Looking to Find Out More?</h1>
                <p>If you have any questions about us or the product we offer, please get in touch. We’re always happy to hear from you, however, you choose to contact us. Simply fill in the form or get in touch via the following options:</p>
                <br />
                <p>Email: info@gpushop.com</p>
                <p>WhatsApp • Text • iMessage • Viber: +84 909 343 760 (8:00 am – 8:00 pm)</p>
                <p>Office Opening Hours: Monday – Friday, 9:00 am – 4:00 pm</p>
                <p>Address:</p>
                <p>
                4097 Friendship Lane <br />
                Santa Clara <br />
                California <br />
                95054</p>
            </div>

            <div className="w-50 text-center">
                <p>Name</p>
                <input type="text" />
                <p>Number</p>
                <input type="number"/>
                <p>Email</p>
                <input type="email" />
                <p>Message</p>
                <input type="text" />
                <br />
                <br />
                <button className='s-btn'>Send</button>
            </div>
        </div>
    );
};

export default Contact;