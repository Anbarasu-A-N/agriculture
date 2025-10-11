import React from 'react';
import "./GrievancesList.css";
import Navbar from './Navbar';
import Footer from './Footer';

const GrievancesList = () => {
  const grievances = [
    {
      title: 'High-Interest Rates',
      details: 'Farmers often complain about the high-interest rates on agricultural loans, making it challenging for them to repay the borrowed amount.',
    },
    {
      title: 'Delay in Loan Disbursement',
      details: 'Farmers may face delays in receiving the sanctioned loan amount, affecting their ability to invest in timely agricultural activities.',
    },
    {
      title: 'Inadequate Loan Amount',
      details: 'Some farmers may feel that the loan amount sanctioned is insufficient for meeting their agricultural needs, including purchasing seeds, fertilizers, and equipment.',
    },
    {
      title: 'Complex Application Procedures',
      details: 'Cumbersome and complicated application procedures can be a source of frustration for farmers, particularly those with limited literacy and awareness.',
    },
    {
      title: 'Lack of Access to Credit',
      details: 'In remote rural areas, farmers may struggle to access formal credit facilities, leading them to rely on informal sources with potentially exploitative terms.',
    },
    {
      title: 'Crop Insurance Issues',
      details: 'Farmers often face difficulties with crop insurance, including delays in claims settlement and dissatisfaction with the coverage provided.',
    },
    {
      title: 'Poor Loan Recovery Practices',
      details: 'Farmers may face aggressive loan recovery practices, including harsh penalties and coercive measures, leading to financial distress.',
    },
    {
      title: 'Insufficient Support for Small and Marginal Farmers',
      details: 'Small and marginal farmers may feel neglected, as they often require more support due to their limited resources and vulnerability to market fluctuations.',
    },
    {
      title: 'Lack of Financial Literacy',
      details: 'Many farmers lack awareness and understanding of the terms and conditions associated with agricultural loans, making them susceptible to exploitation.',
    },
    {
      title: 'Government Policy Issues',
      details: 'Changes in government policies related to agriculture and rural credit can impact farmers, and they may express grievances if these changes adversely affect their financial stability.',
    },
  ];

  return (
    <>
    <Navbar/>
    <div className='gribgcolor'>
      <br/><br/><br/>
 
    <div className='grievances'>
      <h2 id='grievances'>Agricultural Loan Grievances</h2>
      <ul>
        {grievances.map((grievance, index) => (
          <li key={index}>
            <strong>{grievance.title}</strong>: {grievance.details}
          </li>
        ))}
      </ul>
    </div><br/><br/>

    </div>

    <Footer/>
    </>
  );
};

export default GrievancesList;
