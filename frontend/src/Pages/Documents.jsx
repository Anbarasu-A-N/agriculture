// Documents.jsx

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import "./Documents.css";

const DocumentList = ({ title, items }) => (
  <div>
    <h2 id='requireddoc1' >{title}</h2>
    <ul id='requireddoc1'>
      {items.map((item, index) => (
        <li id='requireddoc1' key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const MandatoryDocuments = () => {
  const mandatoryItems = [
    "Application Form: Complete and signed application form provided by the lending institution.",
    "Identity Proof: Aadhar card, Passport, Voter ID card, PAN card",
    "Residence Proof: Aadhar card, Utility bills (electricity, water, gas)",
    "Land Ownership Documents: Land title documents (sale deed, khata, etc.), Record of Rights (Jamabandi or Patta), Land survey records",
    "Income Proof: Income certificate or salary certificate (for salaried individuals), Income tax returns or Form 16 (for self-employed individuals), Bank statements",
    "Crop Details: Details of the crops to be cultivated, Crop rotation plan",
    "Bank Statements: Bank statements for the past 6 to 12 months",
    "Agricultural Activity Details: Detailed project report (DPR) for the proposed agricultural activity, Cost estimates for the project",
    "Quotations for Equipment and Inputs: Quotations for machinery, seeds, fertilizers, etc.",
    "Guarantor Details: If applicable, details of guarantors along with their identity and residence proof."
  ];

  return <DocumentList id='requireddoc' title="Mandatory Documents : " items={mandatoryItems} />;
};

const OptionalDocuments = () => {
  const optionalItems = [
    "Collateral Documents: Details of any collateral offered as security for the loan",
    "Insurance Details: Crop insurance details, if applicable",
    "Livestock Documents: Livestock ownership records, Health and vaccination certificates, Animal identification records (e.g., ear tags)",
    "Financial Documents: Budgets and financial plans, Loan agreements and financial statements, Receipts for agricultural inputs and equipment purchases",
    "Environmental Compliance Documents: Environmental impact assessments, Permits for water usage or environmental management",
    "Export/Import Documents: Phytosanitary certificates for plant products, Certificates of origin for agricultural exports, Import permits for agricultural goods",
    "Government Subsidies and Programs: Documents related to participation in government agricultural programs, Subsidy application forms and approvals",
    "Harvest and Production Records: Harvest yield records, Production reports, Quality assurance certificates",
    "Safety and Compliance Documents: Occupational health and safety documentation, Compliance with agricultural regulations",
    "Business Registration and Licensing: Farm business registration documents, Licenses for agricultural activities"
  ];

  return <DocumentList id='requireddoc1' title="Optional Documents (Depending on the Situation): " items={optionalItems} />;
};

const Documents = () => {
  return (
    <>
    <Navbar/>
    <div className='docbgcolor'>
    <div className='requireddoc' id='requireddoc'>
      <h1 id='requireddoc'>Loan Application Documents</h1>
      <div id='requireddoc1'>
      <MandatoryDocuments />
      <OptionalDocuments />
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Documents;
