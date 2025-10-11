import React from "react";
import "./SocialLinks.css";
import Mail from "./Images/Mail.webp";
import Facebook from "./Images/facebook1.png";
import Instagram from "./Images/Instagram.webp";
import Linkedin from "./Images/Linkedin.png";
import Twitter from "./Images/Twitter.png";

const SocialLinks = () => {
  return (
    <>
    <br/>
    <div>
    <div className="social">
      
      
      
      <a id="sociallink" href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJfmrfTTSlXGZFzXfxJJNXhGCdVdknMMpsDNBTpcKwlpQgJGNnBjDSwRWcbLkqNXwtrztXB">
      <img src={Mail} alt="Profile" className="icon" style={{ width: '40px', height: '40px' }} />
      </a>
     

      <a id="sociallink" href="https://www.facebook.com/">
      <img src={Facebook} alt="Profile" className="icon"style={{ width: '40px', height: '40px' }} />
      </a>
     

      <a id="sociallink" href="https://www.linkedin.com/">
      <img src={Linkedin} alt="Profile" className="icon" style={{ width: '40px', height: '40px' }} />
      </a>
     

      <a id="sociallink" href="https://www.instagram.com/">
      <img src={Instagram} alt="Profile" className="icon" style={{ width: '40px', height: '40px' }} />
      </a>
      

      <a id="sociallink" href="https://twitter.com/">
      <img src={Twitter} alt="Profile" className="icon" style={{ width: '40px', height: '40px' }} />
      </a>
    </div></div></>
  );
}

export default SocialLinks;
