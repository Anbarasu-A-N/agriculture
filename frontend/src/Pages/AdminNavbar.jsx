// AdminNavbar.jsx

import React from "react";
import Logo from "./Images/Allsmart.png";
import "./AdminNavbar.css";
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { logout } from '../redux/actions';
import { useNavigate, Link } from 'react-router-dom';


const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn); // Get isLoggedIn from Redux state

  const handleAdminLogout = () => {
    dispatch(logout()); // Dispatch the logout action to update Redux state
    localStorage.removeItem('emailId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="adminnavborder">
      <nav id="adminnavbar">
        <div id="adminnavbar" className="logo">
          <Link to="/adminhome">
            <img
              src={Logo}
              id="adminnavbarlogo"
              alt="Profile"
              style={{ width: "30px", height: "32px", marginTop: '5px', marginLeft: '0px' }}
            />
          </Link>
        </div>
        <ul className="nav-links" id="adminnavbar">
          <li>
            <Link id="adminnavbar" to="/adminhome">Home</Link>
          </li>
          <li>
            <Link id="adminnavbar" to="/updates">Updates from Customers</Link>
          </li>
          <li>
            <Link id="adminnavbar" to="/admincheckstatus">Loan</Link>
          </li>
          <li>
            <Link id="adminnavbar" to="/adminsupport">Support Request</Link>
          </li>
          <li>
            <Link id="adminnavbar" to="/admincontactus">Contact To Customer</Link>
          </li>
          <li>
            <Link id="adminnavbar" to="/adminreview">
              Customers Review
            </Link>
          </li>
          <li>
            <button className="adminlogout" id="adminlogout-button" onClick={handleAdminLogout}>
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
