


// Form.jsx

import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useNavigate } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import Loan from './Loan.pdf'; // Import the PDF file
import Footer from './Footer';
import Navbar from './Navbar';
import './Form.css'; // Import the CSS file
import Loanpng from "./Images/loan.png";

const Form = () => {
  const [showPdf, setShowPdf] = useState(false);
  const navigate = useNavigate();

  const onDocumentLoadSuccess = ({ numPages }) => {
    // You can use numPages if needed in the future
    console.log(`Document loaded with ${numPages} pages`);
    setShowPdf(true); // Show the PDF once it's loaded
  };

  const handleDownload = () => {
    // You can customize the filename here
    const fileName = 'Loan.pdf';
    const pdfPath = '/' + fileName; // Replace with "/" placeholder
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <Navbar />
      <div className='formbgcolor'>
      <div className="form">
        <div className='formfirst'>

        <h1 className="Hi" style={{ padding: 0, fontFamily: 'Times New Roman' , textAlign: 'center'}}>
          Apply Loan Form
        </h1>
        <div className='pdf-default-container'>
        <div className="pdf-container-wrapper">
          <div className={`pdf-container ${showPdf ? 'visible' : 'hidden'}`}>
            <div className="pdf-viewer">
              {showPdf && (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={Loan} onLoadSuccess={onDocumentLoadSuccess} />
                </Worker>
              )}
            </div>
          </div>
          
        </div>
        <div className="pdf-controls">
            <button className="form-button" id="form-button" onClick={() => setShowPdf(!showPdf)}>
              {showPdf ? 'Hide PDF' : 'View PDF'}
            </button>
            <button className="form-button" id="form-button" onClick={handleDownload}>
              Download PDF
            </button>
            <button className="form-button" id="form-button" onClick={() => navigate('/applyloan')}>
              Apply Online
            </button>
          </div>
        </div>
        </div>
        <div className='formsecond'>
        <img src={Loanpng} alt="loan" style={{ width: '90%', height: '600px', paddingTop: '0px', marginRight: '30px' }} />

        </div>

      </div>
      </div>
      <Footer />
    </>
  );
};

export default Form;


/*

*/
