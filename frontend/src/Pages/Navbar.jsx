


import React, { useState } from "react";
import Logo from "./Images/Allsmart.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isServiceTypeOpen, setServiceTypeOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);

  const handleServiceTypeMouseEnter = () => {
    setServiceTypeOpen(true);
  };

  const handleServiceTypeMouseLeave = () => {
    setServiceTypeOpen(false);
  };

  const handleServicesMouseEnter = () => {
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    setServicesOpen(false);
  };

  return (
    <div className="border" id="usernavbar">
      <nav id="usernavbar">
        <div className="logo">
          <Link id="usernavbar" to="/">
            <img
              src={Logo}
              alt="Profile"
              id="usernavbar"
              style={{ width: "30px", height: "32px" , marginTop: '5px' , marginLeft: '10px'}}
            />
          </Link>
        </div>
       
        <ul className="nav-links" id="usernavbar">
          <li>
            <Link id="usernavbar" to="/">Home</Link>
          </li>
          <li
            className="dropdown"
            onMouseEnter={handleServiceTypeMouseEnter}
            onMouseLeave={handleServiceTypeMouseLeave}
          >
            <Link id="usernavbar"  >Loan</Link>
            {isServiceTypeOpen && (
              <ul className="dropdown-menu" id="usernavbar">
                
                <li>
                  <Link id="usernavbarsub" to="/applyloan">Apply Online</Link>
                </li>
                <li>
                  <Link id="usernavbarsub" to="/payment">Payment</Link>
                </li>
                <li>
                  <Link id="usernavbarsub" to="/form">View PDF</Link>
                </li>
                <li>
                  <Link  id="usernavbarsub" to="/checkstatus">Check Status</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            className="dropdown"
            onMouseEnter={handleServiceTypeMouseEnter}
            onMouseLeave={handleServiceTypeMouseLeave}
          >
            <Link id="usernavbar" style={{overflow:'visible'}}>Service Type</Link>
            {isServiceTypeOpen && (
              <ul className="dropdown-menu" id="usernavbar">
                
                <li>
                  <Link id="usernavbarsub" style={{overflow:'visible'}}to="/servicetype">Crop Loan</Link>
                </li>
                <li>
                  <Link  id="usernavbarsub" style={{overflow:'visible'}}to="/servicetype">Agri Land Loan</Link>
                </li>
                <li>
                  <Link  id="usernavbarsub" style={{overflow:'visible'}} to="/servicetype">Machine Loan</Link>
                </li>
                <li>
                  <Link  id="usernavbarsub" style={{overflow:'visible'}} to="/servicetype">Infrastructure Loan</Link>
                </li>
                <li>
                  <Link  id="usernavbarsub" style={{overflow:'visible'}} to="/servicetype">Dairy Farm Loan</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            className="dropdown"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <Link id="usernavbar" >Customer Services</Link>
            {isServicesOpen && (
              <ul className="dropdown-menu" id="usernavbar">
                <li>
                  <Link  id="usernavbarsub" to="/review">Review</Link>
                </li>
                <li>
                  <Link  id="usernavbarsub" to="/supportcenter">Support Center</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link id="usernavbar" to="/contactus">Contact Us</Link>
          </li>
          <li>
            <Link id="usernavbar" to="/aboutUs">About Us</Link>
          </li>
          <li>
            <Link id="usernavbar" to="/profile" className="Profile">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;


/*
*/