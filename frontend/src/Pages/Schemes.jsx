// Schemes.jsx

import React from 'react';
import './Schemes.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Schemes = () => {
  // Array of schemes
  const schemes = [
    "Schemes for Farmers",
    "Agriculture Infrastructure Fund",
    "Animal Husbandry Infrastructure Development Fund",
    "Credit facility for farmers",
    "Crop insurance schemes",
    "Group Accident Insurance scheme for Fishermen",
    "Interest subvention for dairy sector",
    "KCC for animal husbandry and fisheries",
    "Krishi UDAN scheme",
    "Mission Amrit Sarovar",
    "National Beekeeping and Honey Mission",
    "National Mission on Edible Oils",
    "National Mission on Natural Farming",
    "National Scheme of Welfare of Fishermen",
    "PM Kisan Maan Dhan Yojana",
    "Pradhan Mantri Kisan Samman Nidhi",
    "Pradhan Mantri Krishi Sinchai Yojana",
    "Primary Agricultural Credit Societies (PACS)",
    "Unique package for farmers",
    "Vibrant Villages Programme"
  ];

  return (
    <>
    <Navbar/>
    <div className='schemebgcolor'>
      <br/>
    <div className="schemes-container">
      <h2 id='schemes' >Agriculture Loan Schemes</h2>
      <ul  id='schemes'  >
        {schemes.map((scheme, index) => (
          <li  id='schemes'  key={index}>{scheme}</li>
        ))}
      </ul>
    </div>
    <br/>
    </div>
    <Footer/>
    </>
  );
}

export default Schemes;
