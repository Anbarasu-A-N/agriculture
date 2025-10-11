
import React from 'react';
import './Footer.css';
import SocialLinks from "./SocialLinks.jsx";

const Footer = () => {
  return (
    <>
    <div className='footerbgcolor'>
    <footer className="footer">
        <p>Connect with Social Networks</p>
      <SocialLinks />
      <div className="footer__bottom">
        <p className="footer__bottom-text">
          &copy; {new Date().getFullYear()} Allsmart Agriculture Loan Portal. All rights reserved. Privacy | Terms 
        </p>
      </div>
    </footer>
    </div>
    </>
  );
};

export default Footer;
