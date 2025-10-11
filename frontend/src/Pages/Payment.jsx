import React, { useState } from 'react';
import './Payment.css';
import Banklogo from "./Images/Allsmart.png";
import Paymentimg from "./Images/Payment.png";
import RBI from "./Images/RBI.png";
import SIM from "./Images/Sim.png";
import Navbar from './Navbar';
import Footer from './Footer';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const handleCardNumberChange = (e) => {
    // Remove any non-numeric characters from the input
    const formattedValue = e.target.value.replace(/\D/g, '');

    // Add a space after every 4 digits
    let formattedNumber = formattedValue.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ');

    // Update the state with the formatted number
    setCardNumber(formattedNumber.trim());
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleCardHolderNameChange = (e) => {
    setCardHolderName(e.target.value);
  };

  const handleCvvFocus = () => {
    setIsCvvFocused(true);
  };

  const handleCvvBlur = () => {
    setIsCvvFocused(false);
  };

  return (
    <>
      <Navbar/>
      <div className='main-payment-container'>
        <div className="payment-container">
          
          <div className={`debit-card ${isCvvFocused ? 'is-flipped' : ''}`}>
            <div className="card-front">
              <div className="bank-details">
                <img src={Banklogo} alt="Bank Logo" className="bank-logo" />
                <label id='paymentbank'>Allsmart Bank</label>
                <img src={RBI} style={{position: 'absolute' ,height:'80px', width: '80px', top : 15, right: 10}}alt="Bank Logo" className="bank-logo" />
              </div>
              <div className="sim-details">
                <img src={SIM} style={{marginLeft: '15px',width: '45px', height: '45px'}}/>
              </div>
              <div className="card-number">
                <label id='payment'>Card Number  </label>
                <label id='payment'>{cardNumber}</label>
              </div>
              <div className='payment-align-bottom'>
                <div ><span id='leftpayment'>Card Holder Name</span><span id='rightpayment'>Valid Upto  </span>
                </div>
                <br/>
                <div >
                  <span id='leftpayment' style={{marginTop: '6px'}}>{cardHolderName}</span>
                  <span id='rightpayment'style={{marginTop: '6px'}}>{expiryDate} &nbsp;&nbsp;</span>
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className='payment-card-back'></div>
              <label id='payment-signature'>Signature</label>
                <div className="card-cvv">
                  <label id='paymentcvv'><span id='signature'>{cardHolderName}</span>&nbsp;&nbsp;&nbsp;
                  CVV &nbsp;&nbsp;&nbsp;{cvv}</label>
                </div>

                <div className="payment-otherdetails">
                  <label id='payment-security'>Security Features</label>
                  <p id='payment-security'>"Your card is protected by advanced security features to safeguard your transactions. For assistance or inquiries, please contact our customer service."</p>
                </div>
            </div>
          </div>
          <div className="paymentform">
            <input id='payment' type="text" placeholder="Card Number" value={cardNumber} onChange={handleCardNumberChange} maxLength={19} />
            <input id='payment' type="text" placeholder="MM/YY" value={expiryDate} onChange={handleExpiryDateChange} maxLength={5} />
            <input id='payment' type="text" placeholder="Card Holder Name" value={cardHolderName} onChange={handleCardHolderNameChange} autoComplete='off' maxLength={22}/>
            <input id='payment' type="text" placeholder="CVV" value={cvv} onChange={handleCvvChange} maxLength={3} onFocus={handleCvvFocus} onBlur={handleCvvBlur} />
            <button id='payment-button'>Payment</button>
          </div>
        </div>
        <div className='second-payment-container'>
          <img src={Paymentimg} alt="loan" style={{ width: '400px', height: '400px', marginTop: '10px', paddingTop: '0px', marginRight: '100px' }} />
        </div>
      </div>
      <div style={{position: 'absolute' , width: '100%', bottom: 0, left: 0}}>
        <Footer />
      </div>
    </>
  );
};

export default Payment;




/*


import React, { useState } from 'react';
import './Payment.css';
import Banklogo from "./Images/Allsmart.png";
import Paymentimg from "./Images/Payment.png";
import RBI from "./Images/RBI.png";
import SIM from "./Images/Sim.png";
import Navbar from './Navbar';
import Footer from './Footer';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleCardHolderNameChange = (e) => {
    setCardHolderName(e.target.value);
  };

  const handleCvvFocus = () => {
    setIsCvvFocused(true);
  };

  const handleCvvBlur = () => {
    setIsCvvFocused(false);
  };

  return (
    <>
    <Navbar/>
    <div className='main-payment-container'>
    <div className="payment-container">
      
      <div className={`debit-card ${isCvvFocused ? 'is-flipped' : ''}`}>
        <div className="card-front">
          <div className="bank-details">
            <img src={Banklogo} alt="Bank Logo" className="bank-logo" />
            <label id='paymentbank'>Allsmart Bank</label>
            <img src={RBI} style={{position: 'absolute' ,height:'80px', width: '80px', top : 15, right: 10}}alt="Bank Logo" className="bank-logo" />
          </div>
          <div className="sim-details">
          <img src={SIM} style={{marginLeft: '15px',width: '45px', height: '45px'}}/>
          </div>
          <div className="card-number">
            <label id='payment'>Card Number  </label>
            <label id='payment'>{cardNumber}</label>
          </div>
          <div className='payment-align-bottom'>
            <div ><span id='leftpayment'>Card Holder Name</span><span id='rightpayment'>Valid Upto  </span>
            </div>
            <br/>
            <div >
              <span id='leftpayment' style={{marginTop: '6px'}}>{cardHolderName}</span>
              <span id='rightpayment'style={{marginTop: '6px'}}>{expiryDate} &nbsp;&nbsp;</span>
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className='payment-card-back'></div>
          <label id='payment-signature'>Signature</label>
            <div className="card-cvv">
            
              <label id='paymentcvv'><span id='signature'>{cardHolderName}</span>&nbsp;&nbsp;&nbsp;
              CVV &nbsp;&nbsp;&nbsp;{cvv}</label>
            </div>

            <div className="payment-otherdetails">
              <label id='payment-security'>Security Features</label>
              <p id='payment-security'>"Your card is protected by advanced security features to safeguard your transactions. For assistance or inquiries, please contact our customer service."</p>
            </div>
           

        </div>
        
      </div>
      <div className="paymentform">
        <input id='payment' type="number" placeholder="Card Number" value={cardNumber} onChange={handleCardNumberChange} maxLength={16} />
        <input id='payment' type="text" placeholder="MM/YY" value={expiryDate} onChange={handleExpiryDateChange} maxLength={5} />
        <input id='payment' type="text" placeholder="Card Holder Name" value={cardHolderName} onChange={handleCardHolderNameChange} autoComplete='off' maxLength={22}/>
        <input id='payment' type="text" placeholder="CVV" value={cvv} onChange={handleCvvChange} maxLength={3} onFocus={handleCvvFocus} onBlur={handleCvvBlur} />
        <button id='payment-button'>Payment</button>
      </div>
      
    </div>
    <div className='second-payment-container'>
    <img src={Paymentimg} alt="loan" style={{ width: '400px', height: '400px', marginTop: '10px', paddingTop: '0px', marginRight: '100px' }} />
    </div>
    </div>

    <div style={{position: 'absolute' , width: '100%', bottom: 0, left: 0}}>
    <Footer />
    </div>

    </>
  );
};

export default Payment;


/*
*/