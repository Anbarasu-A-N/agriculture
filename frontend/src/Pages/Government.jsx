// Government.jsx

import React from 'react';
import './Government.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Government = () => {
  const stateWebsites = [
    { name: 'A and Islands', url: 'http://agri.and.nic.in' },
    { name: 'Andhra Pradesh', url: 'http://www.apagrisnet.gov.in' },
    { name: 'Arunachal Pradesh', url: 'http://arunachalpradesh.nic.in' },
    { name: 'Assam', url: 'https://agri-horti.assam.gov.in/' },
    { name: 'Bihar', url: 'https://state.bihar.gov.in/krishi/CitizenHome.html' },
    { name: 'Daman and Diu', url: 'http://www.daman.nic.in/websites/zonal_agriculture_daman/index.asp' },
    { name: 'Delhi', url: 'https://development.delhi.gov.in/development/agriculture-unit' },
    { name: 'Goa', url: 'http://agri.goa.gov.in' },
    { name: 'Gujarat', url: 'https://agri.gujarat.gov.in/' },
    { name: 'Haryana', url: 'http://agriharyana.gov.in/' },
    { name: 'Himachal Pradesh', url: 'https://www.agisac.gov.in/agriculture/Agri_Home.aspx' },
    { name: 'Jammu & Kashmir', url: 'http://www.jkapd.nic.in/' },
    { name: 'Jharkhand', url: 'http://www.jharkhand.gov.in/agri' },
    { name: 'Karnataka', url: 'https://raitamitra.karnataka.gov.in/english'},
    { name: 'Kerala', url: 'http://www.keralaagriculture.gov.in/' },
    { name: 'Madhya Pradesh', url: 'http://mpkrishi.mp.gov.in/' },
    { name: 'Maharashtra', url: 'http://krishi.maharashtra.gov.in' },
    { name: 'Manipur', url: 'https://manipur.mygov.in/group/department-agriculture/' },
    { name: 'Meghalaya', url: 'http://www.megagriculture.gov.in/' },
    { name: 'Mizoram', url: 'http://agriculturemizoram.nic.in/' },
    { name: 'Nagaland', url: 'https://agriculture.nagaland.gov.in/' },
    { name: 'Odisha', url: 'https://agri.odisha.gov.in/' },
    { name: 'Puducherry', url: 'https://agri.py.gov.in/' },
    { name: 'Punjab', url: 'https://agri.punjab.gov.in/' },
    { name: 'Rajasthan', url: 'http://agriculture.rajasthan.gov.in/' },
    { name: 'Sikkim', url: 'http://www.sikkimagrisnet.org' },
    { name: 'Tamilnadu', url: 'http://www.tn.gov.in/department/2' },
    { name: 'Telangana', url: 'http://agri.telangana.gov.in/' },
    { name: 'Tripura', url: 'http://agri.tripura.gov.in/' },
    { name: 'Uttar Pradesh', url: 'http://upagripardarshi.gov.in/StaticPages/UttarPradesh4.aspx' },
    { name: 'Uttarakhand', url: 'http://agriculture.uk.gov.in/' },
    { name: 'West Bengal', url: 'https://wb.gov.in/portal/web/guest/agriculture' },
  ];

  return (
    <>
    <Navbar/>
    <div className='govbgcolor'>
      <br/>
    <div className="government-container">
      <h2 id='gov-link'>Government Agriculture Websites</h2>
      <ul id='gov-link'>
        {stateWebsites.map((state, index) => (
          <li id='gov-link' key={index}>
            <strong id='gov-link'>{state.name}:</strong>{' '}
            <a href={state.url} id='gov-link' target="_blank" rel="noopener noreferrer">
              {state.url}
            </a>
          </li>
        ))}
      </ul>
      
    </div>
    <br/>
    </div>
    <Footer/>
    </>
  );
}

export default Government;
