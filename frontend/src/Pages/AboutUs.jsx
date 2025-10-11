import React from 'react';
import './AboutUs.css';
import Navbar from './Navbar';
import Footer from './Footer';
import First from "./Images/First.jpg";
import Second from "./Images/Second.jpg";
import Third from "./Images/Third.jpg";

const AboutUs = () => {
  
  const handleContactClick = (email) => {
    const mailtoLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    window.open(mailtoLink, "_blank");
  };
  
  return (
    <>
      <Navbar />
      <div className='aboutbgcolor'>
        <br/>
      <div className='container'>
        <div className="about-section">
          <h1>About Us</h1>
          <h1>Allsmart Agriculture Loan Portal</h1>
          <p>Welcome to the Agriculture Loan Portal, your trusted partner in empowering farmers and promoting sustainable agriculture. </p>
          <p>We understand the crucial role agriculture plays in our society, and our mission is to provide accessible financial solutions to farmers, enabling them to thrive and contribute to food security.</p>
          
        </div>
        <div style={{ textAlign: 'center' }} id='about1'>
          <h2>Our Vision</h2>
          <p>To create a platform that revolutionizes agricultural financing, making it seamless, transparent,</p>
          <p>and tailored to the unique needs of farmers across the nation. </p>
          <p>We envision a future where farmers have easy access to funds, fostering growth, innovation, and prosperity in the agricultural sector.</p>
        </div>
        <div id='aboutc'>
          <div id='aboutc1'>
            <h2 style={{ textAlign: 'center' }}>What Sets Us Apart</h2>
            <h6 id='about'>Farmers First Approach:</h6>
            <p id='about'> Our platform is designed with farmers in mind. We prioritize their needs, ensuring that our loan products and services are farmer-centric and aligned with the agricultural cycle.</p>
            <h6 id='about'>Financial Inclusion:</h6>
            <p id='about'>We believe in inclusive growth. Our aim is to reach farmers in every corner of the country, including small and marginalized communities, providing them with financial tools to enhance productivity and income.</p>
            <h6 id='about'>Technology-Driven Solutions:</h6>
            <p id='about'>Leveraging the power of technology, we offer a user-friendly online portal that simplifies the loan application process. Quick approvals, minimal paperwork, and easy access to information are our top priorities.</p>
            <h6 id='about'>Partnerships for Progress:</h6>
            <p id='about'> We collaborate with agricultural experts, government bodies, and financial institutions to stay informed about the latest trends, policies, and best practices. These partnerships allow us to offer the most relevant and beneficial services to our farmers.</p>
            
          </div>

          <div id='aboutc2'>
          <h2 style={{ textAlign: 'center' }}>Our Commitment</h2>
          <h6 id='about'>Transparency:</h6>
          <p id='about'>We believe in transparent and fair lending practices. Our processes are clear, and we ensure that farmers understand the terms and conditions of their loans.</p>
          <h6 id='about'>Sustainability: </h6>
          <p id='about'> Agriculture is the backbone of our nation, and we are committed to promoting sustainable farming practices. Our loans support initiatives that focus on environmental conservation and responsible agricultural methods.</p>
           <h6 id='about'>Community Impact:</h6>
           <p id='about'>Beyond financial support, we actively engage with farming communities, organizing workshops, training sessions, and awareness programs. We aim to create a positive impact on the lives of farmers and their families.</p>
          </div>

        </div>

        <h2 style={{ textAlign: 'center' }}>Our Team</h2>
        <div className="row">
          <div className="column">
            <div className="card">
              <img src={First} alt="First"  style={{ width: '100%' }} />
              <div className="container">
                <h2>Angel A</h2>
                <p className="title">Manager</p>
                <p>Manage the Allsmart Agriculture Loan website</p>
                <p>manage@gmail.com</p>
                <p>
                  <button className="button" onClick={() => handleContactClick("mr.emperoroflove@gmail.com")}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src={Second} alt="Second"  style={{ width: '100%' }} />
              <div className="container">
                <h2>Anbarasu AN</h2>
                <p className="title">Admin</p>
                <p>Manage the Website , Loans , Consumer and Others</p>
                <p>admin@gmail.com</p>
                <p>
                  <button className="button" onClick={() => handleContactClick("mr.emperoroflove@gmail.com")}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img src={Third} alt="Third" style={{ width: '100%' }} />
              <div className="container">
                <h2>Angel A</h2>
                <p className="title">Manager</p>
                <p>Manage the Allsmart Agriculture Loan website</p>
                <p>manager@gmail.com</p>
                <p>
                  <button className="button" onClick={() => handleContactClick("mr.emperoroflove@gmail.com")}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

