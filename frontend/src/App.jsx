


import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import AdminReview from './Pages/AdminReview.jsx';
import store from './redux/store';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import HomePage from './Pages/HomePage.jsx';
import Profile from './Pages/Profile.jsx';
import ForgotPwd from './Pages/ForgotPwd.jsx';
import ChangePassword from './Pages/ChangePassword.jsx';
import Review from './Pages/Review.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import Contact from './Pages/Contact.jsx';
import AdminLogin from './Pages/AdminLogin.jsx';
import AdminHome from './Pages/AdminHome.jsx';
import Documents from './Pages/Documents.jsx';
import Form from './Pages/Form.jsx';
import AdminUpdate from './Pages/AdminUpdate.jsx';
import ServiceType from './Pages/ServiceType.jsx';
import ApplyLoan from './Pages/ApplyLoan.jsx';
import CheckStatus from './Pages/CheckStatus.jsx';
import UpdateUserDetails from './Pages/UpdateUserDetails.jsx';
import AdminContactUs from './Pages/AdminContactUs.jsx';
import AdminCheckStatus from './Pages/AdminCheckStatus.jsx';
import GrievancesList from './Pages/GrievancesList.jsx';
import Schemes from './Pages/Schemes.jsx';
import Government from './Pages/Government.jsx';
import SupportCenter from './Pages/Support.jsx';
import AdminSupport from './Pages/AdminSupport.jsx';
import Recaptcha from './Pages/Recaptcha.jsx';
import Payment from './Pages/Payment.jsx';

const App = () => {

  const verificationSuccess = useSelector(state => state.verificationSuccess);


  // Get isLoggedIn from Redux store
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if isLoggedIn state is loaded from Redux store
    if (isLoggedIn !== false) {
      setIsLoaded(true);
    }
  }, [isLoggedIn]);

  // Show loading indicator until isLoggedIn state is loaded


  return (
    <Provider store={store}>
      <Router>
        <Routes>



          <Route path="/recaptcha" element={<Recaptcha />} />
          {verificationSuccess ? (
            <Route path="/payment" element={<Payment />} />
          ) : (
            <Route path="/payment" element={<Navigate to="/recaptcha" replace />} />
          )}


          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/forgot-pwd" element={<ForgotPwd />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/updatedetails" element={<UpdateUserDetails />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/form" element={<Form />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/servicetype" element={<ServiceType /> } />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/government" element={<Government />} />
          <Route path="/grievances" element={<GrievancesList />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/supportcenter" element={<SupportCenter />} />

          <Route path="/admincontactus" element={isLoggedIn ? <AdminContactUs /> : <Navigate to="/admin" replace />} />

          <Route path="/adminhome" element={isLoggedIn ? <AdminHome /> : <Navigate to="/admin" replace />} />

          <Route path="/updates" element={isLoggedIn ? <AdminUpdate /> : <Navigate to="/admin" replace />} />

          <Route path="/adminreview" element={isLoggedIn ? <AdminReview /> : <Navigate to="/admin" replace />} />

          <Route path="/admincheckstatus" element={isLoggedIn ? <AdminCheckStatus /> : <Navigate to="/admin" replace />} />

          <Route path="/adminsupport" element={isLoggedIn ? <AdminSupport /> : <Navigate to="/admin" replace />} />



          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/changepassword"
            element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/review"
            element={isLoggedIn ? <Review /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/contactus"
            element={isLoggedIn ? <Contact /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/applyloan"
            element={isLoggedIn ? <ApplyLoan /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/checkstatus"
            element={isLoggedIn ? <CheckStatus /> : <Navigate to="/login" replace />}
          />

          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/form" element={<Form />} />
          <Route path="/servicetype" element={<ServiceType />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;




/*

import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import AdminReview from './Pages/AdminReview.jsx';
import store from './redux/store';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import HomePage from './Pages/HomePage.jsx';
import Profile from './Pages/Profile.jsx';
import ForgotPwd from './Pages/ForgotPwd.jsx';
import ChangePassword from './Pages/ChangePassword.jsx';
import Review from './Pages/Review.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import Contact from './Pages/Contact.jsx';
import AdminLogin from './Pages/AdminLogin.jsx';
import AdminHome from './Pages/AdminHome.jsx';
import Documents from './Pages/Documents.jsx';
import Form from './Pages/Form.jsx';
import AdminUpdate from './Pages/AdminUpdate.jsx';
import ServiceType from './Pages/ServiceType.jsx';
import ApplyLoan from './Pages/ApplyLoan.jsx';
import CheckStatus from './Pages/CheckStatus.jsx';
import UpdateUserDetails from './Pages/UpdateUserDetails.jsx';
import AdminContactUs from './Pages/AdminContactUs.jsx';
import AdminCheckStatus from './Pages/AdminCheckStatus.jsx';
import GrievancesList from './Pages/GrievancesList.jsx';
import Schemes from './Pages/Schemes.jsx';
import Government from './Pages/Government.jsx';
import SupportCenter from './Pages/Support.jsx';
import AdminSupport from './Pages/AdminSupport.jsx';

const App = () => {
  // Get isLoggedIn from Redux store
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if isLoggedIn state is loaded from Redux store
    if (isLoggedIn !== false) {
      setIsLoaded(true);
    }
  }, [isLoggedIn]);

  // Show loading indicator until isLoggedIn state is loaded


  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/forgot-pwd" element={<ForgotPwd />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/updatedetails" element={<UpdateUserDetails />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/form" element={<Form />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/servicetype" element={<ServiceType /> } />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/government" element={<Government />} />
          <Route path="/grievances" element={<GrievancesList />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/supportcenter" element={<SupportCenter />} />

          <Route path="/admincontactus" element={isLoggedIn ? <AdminContactUs /> : <Navigate to="/admin" replace />} />

          <Route path="/adminhome" element={isLoggedIn ? <AdminHome /> : <Navigate to="/admin" replace />} />

          <Route path="/updates" element={isLoggedIn ? <AdminUpdate /> : <Navigate to="/admin" replace />} />

          <Route path="/adminreview" element={isLoggedIn ? <AdminReview /> : <Navigate to="/admin" replace />} />

          <Route path="/admincheckstatus" element={isLoggedIn ? <AdminCheckStatus /> : <Navigate to="/admin" replace />} />

          <Route path="/adminsupport" element={isLoggedIn ? <AdminSupport /> : <Navigate to="/admin" replace />} />



          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/changepassword"
            element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/review"
            element={isLoggedIn ? <Review /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/contactus"
            element={isLoggedIn ? <Contact /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/applyloan"
            element={isLoggedIn ? <ApplyLoan /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/checkstatus"
            element={isLoggedIn ? <CheckStatus /> : <Navigate to="/login" replace />}
          />

          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/form" element={<Form />} />
          <Route path="/servicetype" element={<ServiceType />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;



/*

*/