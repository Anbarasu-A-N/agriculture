import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { BASE_URL } from '../Config.jsx';
import { setUserId } from '../redux/actions'; // Import setUserId action
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn); // Get isLoggedIn from Redux state
  const userId = useSelector(state => state.userId); // Get userId from Redux state
  
    useEffect(() => {
      if (!userId) {
        fetchUserId();
      } 
    }, [userId]);
  
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const emailId = localStorage.getItem('emailId');
        if (!isLoggedIn && !emailId && token) { // Check if user is not logged in
          navigate('/login');
          return;
        }
  
        const response = await axios.get(`${BASE_URL}/userfunction/profile`, {
          params: { emailId },
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        });
        const userId = response.data.userId; // Extract userId from response
        dispatch(setUserId(userId)); // Save userId in Redux
        localStorage.setItem('userId', userId); // Save userId in localStorage
      } catch (error) {
        console.error("Failed to fetch userId:", error);
      }
    };

  const [selectedState, setSelectedState] = useState('India');
  const allStates = [
    'India',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'

  ];

  const stateIframes = {
    'India': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27841607.697473545!2d61.00083698256399!3d19.729113061269327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e1!3m2!1sen!2sin!4v1705943972947!5m2!1sen!2sin',
    'Andhra Pradesh': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556050.642223363!2d78.11857159210197!3d15.88470629531562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3546f8ae93d47f%3A0x33d1bbbe95adcd83!2sAndhra%20Pradesh!5e1!3m2!1sen!2sin!4v1705940179208!5m2!1sen!2sin',
    'Arunachal Pradesh': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5554824.693466073!2d91.82761104790535!3d26.702843281800742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374043466a1c7227%3A0x76b56e552f9a92f2!2sArunachal%20Pradesh!5e1!3m2!1sen!2sin!4v1705940670614!5m2!1sen!2sin',
    'Assam':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954783.9234073116!2d90.48243811156762!3d25.91099114728845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374516c94c312d63%3A0xd11a73bb736719fb!2sAssam!5e1!3m2!1sen!2sin!4v1705940749989!5m2!1sen!2sin',
    'Bihar':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1662930.8113846695!2d84.48741880342862!3d25.900420866050737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5844f0bb6903%3A0x57ad3fed1bbae325!2sBihar!5e1!3m2!1sen!2sin!4v1705940785195!5m2!1sen!2sin',
    'Chandigarh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99312.65761196072!2d76.68831172108813!3d30.73240198353569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e1!3m2!1sen!2sin!4v1705940818976!5m2!1sen!2sin',
    'Chhattisgarh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453300.13179803!2d79.67781471344013!3d20.929095127388848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a261f16c67a8bad%3A0x5c23f412fb179d95!2sChhattisgarh!5e1!3m2!1sen!2sin!4v1705940862477!5m2!1sen!2sin',
    'Delhi':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405592.18224753055!2d76.76356891374634!3d28.644287353477026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e1!3m2!1sen!2sin!4v1705940940166!5m2!1sen!2sin',
    'Goa':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d891334.5092660676!2d73.3471910483667!3d15.350084489106958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfba106336b741%3A0xeaf887ff62f34092!2sGoa!5e1!3m2!1sen!2sin!4v1705940971057!5m2!1sen!2sin',
    'Gujarat':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418273.224911567!2d68.6848901800457!3d22.39949680100548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959051f5f0ef795%3A0x861bd887ed54522e!2sGujarat!5e1!3m2!1sen!2sin!4v1705940999961!5m2!1sen!2sin',
    'Haryana':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225213.578766426!2d73.39734871535734!3d29.269222408606538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db00b8670400b%3A0x732eaab4aaa6c143!2sHaryana!5e1!3m2!1sen!2sin!4v1705941024093!5m2!1sen!2sin',
    'Himachal Pradesh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1570914.046289826!2d75.98225615094162!3d31.812410115381585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390453c367f901f7%3A0x7cfe04c5564b7725!2sHimachal%20Pradesh!5e1!3m2!1sen!2sin!4v1705941054319!5m2!1sen!2sin',
    'Jharkhand':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386911.4129266567!2d83.00408654239011!3d23.642306315273462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b2386df480857%3A0x62c5b809eee29004!2sJharkhand!5e1!3m2!1sen!2sin!4v1705941110494!5m2!1sen!2sin',
    'Karnataka':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570814.4940177365!2d73.67836452464988!3d15.026145535732317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x41f1d28cd1757cd5!2sKarnataka!5e1!3m2!1sen!2sin!4v1705941138929!5m2!1sen!2sin',
    'Kerala':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634864.945156061!2d73.49571820655787!3d10.538724802775436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0812ffd49cf55b%3A0x64bd90fbed387c99!2sKerala!5e1!3m2!1sen!2sin!4v1705941166647!5m2!1sen!2sin',
    'Madhya Pradesh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378833.6057803426!2d75.77901875062899!3d23.952542150668382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39667381d35aea05%3A0xe0106b0d4e701c1e!2sMadhya%20Pradesh!5e1!3m2!1sen!2sin!4v1705941193406!5m2!1sen!2sin',
    'Maharashtra':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499882.0696501457!2d74.12754026814912!3d18.804785566251468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e1!3m2!1sen!2sin!4v1705941230485!5m2!1sen!2sin',
    'Manipur':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1678683.4829058137!2d92.53745062869845!3d24.75920466780984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3749265bf16390db%3A0x8cc1691ae0a829af!2sManipur!5e1!3m2!1sen!2sin!4v1705941263506!5m2!1sen!2sin',
    'Meghalaya':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1667556.1760281315!2d89.99170719708209!3d25.57026586280484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37507e8f34bd207f%3A0xf5ef6117f496d6e!2sMeghalaya!5e1!3m2!1sen!2sin!4v1705941289172!5m2!1sen!2sin',
    'Mizoram':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1698769.7452949402!2d91.52775449667067!3d23.228180243305278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374d0bd19f3f36f7%3A0xb1f62692a3d5e474!2sMizoram!5e1!3m2!1sen!2sin!4v1705941342824!5m2!1sen!2sin',
    'Nagaland':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1659919.9584003915!2d92.96443430443384!3d26.113243415993175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3746210934c63d31%3A0x1f2df33a89cc3efd!2sNagaland!5e1!3m2!1sen!2sin!4v1705941370757!5m2!1sen!2sin',
    'Odisha':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470373.677830372!2d81.79503742675237!3d20.175410475835836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a226aece9af3bfd%3A0x133625caa9cea81f!2sOdisha!5e1!3m2!1sen!2sin!4v1705941462162!5m2!1sen!2sin',
    'Puducherry':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56520.15041981339!2d79.77232808421613!3d11.93637627992996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361ab8e49cfcf%3A0xcc6bd326d2f0b04e!2sPuducherry!5e1!3m2!1sen!2sin!4v1705941492129!5m2!1sen!2sin',
    'Punjab':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1584199.6726602342!2d74.0915094442751!3d31.022460752774915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964aa569e7355%3A0x8fbd263103a38861!2sPunjab!5e1!3m2!1sen!2sin!4v1705942959923!5m2!1sen!2sin',
    'Rajasthan':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6615240.854649487!2d68.58302389010609!3d26.54023242347269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396a3efaf7e30e37%3A0xb52b9b4506c088e5!2sRajasthan!5e1!3m2!1sen!2sin!4v1705941528033!5m2!1sen!2sin',
    'Sikkim':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d819140.9694092633!2d87.80712034315454!3d27.59786044091011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56a5805eafb%3A0xa4c4b857c39b5a04!2sSikkim!5e1!3m2!1sen!2sin!4v1705943054430!5m2!1sen!2sin',
    'Tamil Nadu':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631557.94482553!2d75.64712472020913!3d10.815335686123108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0x559475cc463361f0!2sTamil%20Nadu!5e1!3m2!1sen!2sin!4v1705941598993!5m2!1sen!2sin',
    'Telangana':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3518981.3285525027!2d76.63685376169961!3d17.86384441282973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3350db9429ed43%3A0x63ef7ba741594059!2sTelangana!5e1!3m2!1sen!2sin!4v1705941624413!5m2!1sen!2sin',
    'Tripura':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d846130.2876850675!2d91.08138422136412!3d23.734504462195492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753b566f6c1a285%3A0x14dd7ae7453fff74!2sTripura!5e1!3m2!1sen!2sin!4v1705941649217!5m2!1sen!2sin',
    'Uttar Pradesh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6585660.702406385!2d75.56423102915275!3d27.048675611804093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39994e9f7b4a09d3%3A0xf6a5476d3617249d!2sUttar%20Pradesh!5e1!3m2!1sen!2sin!4v1705941679762!5m2!1sen!2sin',
    'Uttarakhand':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1599547.5973911197!2d77.98922309154719!3d30.086710545047307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909dcc202279c09%3A0x7c43b63689cc005!2sUttarakhand!5e1!3m2!1sen!2sin!4v1705941708995!5m2!1sen!2sin',
    'West Bengal':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368175.299455393!2d85.20918773509327!3d24.356190537775895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fa16ff1397e887%3A0x71543a3dc3e7a20a!2sWest%20Bengal!5e1!3m2!1sen!2sin!4v1705941737351!5m2!1sen!2sin',
  };

  const cropInformation = {
    'India': {
      crops: 'Rice, Wheat, Millets (such as sorghum and pearl millet), Pulses (like chickpeas, lentils, and peas), Sugarcane',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Wheat': '15k - 30k per acre',
        'Millets': 'Varies',
        'Pulses': '10k - 25k per acre',
        'Sugarcane': '50k - 80k per acre',
      },
    },
    'Andhra Pradesh': {
      crops: 'Rice, Groundnut, Sugarcane, Cotton, Red gram (Pigeon pea)',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Groundnut': '18k - 30k per acre',
        'Sugarcane': '60k - 90k per acre',
        'Cotton': '30k - 45k per acre',
        'Red gram': '20k - 35k per acre',
      },
    },
    'Arunachal Pradesh': {
      crops: 'Rice, Maize, Millets, Buckwheat, Ginger and large cardamom',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Maize': '12k - 25k per acre',
        'Millets': 'Varies',
        'Buckwheat': '15k - 28k per acre',
        'Ginger and large cardamom': '25k - 40k per acre',
      },
    },
    'Assam': {
      crops: 'Rice, Tea, Jute, Sugarcane, Fruits (such as oranges and bananas)',
      additionalInfo: {
        'Rice': '22k - 37k per acre',
        'Tea': '30k - 50k per acre',
        'Jute': '25k - 40k per acre',
        'Sugarcane': '55k - 85k per acre',
        'Fruits': 'Varies',
      },
    },
    'Bihar': {
      crops: 'Rice, Wheat, Maize, Pulses, Sugarcane',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Wheat': '18k - 32k per acre',
        'Maize': '15k - 28k per acre',
        'Pulses': '12k - 22k per acre',
        'Sugarcane': '60k - 90k per acre',
      },
    },
    'Chandigarh': {
      crops: 'Wheat, Rice, Barley, Vegetables, Fruits',
      additionalInfo: {
        'Wheat': '22k - 35k per acre',
        'Rice': '20k - 32k per acre',
        'Barley': '15k - 28k per acre',
        'Vegetables': 'Varies',
        'Fruits': 'Varies',
      },
    },
    'Chhattisgarh': {
      crops: 'Rice, Maize, Pulses, Oilseeds, Sugarcane',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Maize': '14k - 25k per acre',
        'Pulses': '12k - 22k per acre',
        'Oilseeds': '20k - 35k per acre',
        'Sugarcane': '55k - 80k per acre',
      },
    },
    'Delhi': {
      crops: 'Wheat, Rice, Pulses, Fruits, Vegetables',
      additionalInfo: {
        'Wheat': '25k - 40k per acre',
        'Rice': '20k - 35k per acre',
        'Pulses': '15k - 28k per acre',
        'Fruits': 'Varies',
        'Vegetables': 'Varies',
      },
    },
    'Goa': {
      crops: 'Rice, Coconut, Cashew, Kokum, Betel nut',
      additionalInfo: {
        'Rice': '22k - 35k per acre',
        'Coconut': '30k - 45k per acre',
        'Cashew': '40k - 60k per acre',
        'Kokum': '25k - 40k per acre',
        'Betel nut': '35k - 50k per acre',
      },
    },
    'Gujarat': {
      crops: 'Cotton, Groundnut, Rice, Wheat, Sugarcane',
      additionalInfo: {
        'Cotton': '30k - 45k per acre',
        'Groundnut': '25k - 40k per acre',
        'Rice': '20k - 35k per acre',
        'Wheat': '18k - 32k per acre',
        'Sugarcane': '60k - 90k per acre',
      },
    },
    'Haryana': {
      crops: 'Wheat, Rice, Sugarcane, Barley, Mustard',
      additionalInfo: {
        'Wheat': '22k - 35k per acre',
        'Rice': '20k - 32k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Barley': '15k - 28k per acre',
        'Mustard': '18k - 30k per acre',
      },
    },
    'Himachal Pradesh': {
      crops: 'Apples, Potatoes, Barley, Maize, Wheat',
      additionalInfo: {
        'Apples': '40k - 60k per acre',
        'Potatoes': '25k - 40k per acre',
        'Barley': '18k - 30k per acre',
        'Maize': '15k - 28k per acre',
        'Wheat': '20k - 35k per acre',
      },
    },
    'Jharkhand': {
      crops: 'Rice, Maize, Pulses, Oilseeds, Vegetables',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Maize': '15k - 28k per acre',
        'Pulses': '12k - 22k per acre',
        'Oilseeds': '18k - 30k per acre',
        'Vegetables': 'Varies',
      },
    },
    'Karnataka': {
      crops: 'Rice, Sugarcane, Coconut, Ragi, Groundnut',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Sugarcane': '60k - 90k per acre',
        'Coconut': '35k - 50k per acre',
        'Ragi': '20k - 35k per acre',
        'Groundnut': '18k - 30k per acre',
      },
    },
    'Kerala': {
      crops: 'Coconut, Rubber, Rice, Pepper, Cardamom',
      additionalInfo: {
        'Coconut': '30k - 45k per acre',
        'Rubber': '40k - 60k per acre',
        'Rice': '22k - 37k per acre',
        'Pepper': '35k - 50k per acre',
        'Cardamom': '45k - 70k per acre',
      },
    },
    'Madhya Pradesh': {
      crops: 'Wheat, Rice, Soybeans, Gram (Chana), Maize',
      additionalInfo: {
        'Wheat': '22k - 35k per acre',
        'Rice': '20k - 32k per acre',
        'Soybeans': '25k - 40k per acre',
        'Gram (Chana)': '18k - 30k per acre',
        'Maize': '15k - 28k per acre',
      },
    },
    'Maharashtra': {
      crops: 'Sugarcane, Cotton, Soybeans, Groundnut, Rice',
      additionalInfo: {
        'Sugarcane': '55k - 80k per acre',
        'Cotton': '30k - 45k per acre',
        'Soybeans': '25k - 40k per acre',
        'Groundnut': '20k - 35k per acre',
        'Rice': '22k - 37k per acre',
      },
    },
    'Manipur': {
      crops: 'Rice, Maize, Sugarcane, Pulses, Fruits',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Maize': '14k - 25k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Pulses': '12k - 22k per acre',
        'Fruits': 'Varies',
      },
    },
    'Meghalaya': {
      crops: 'Rice, Maize, Potatoes, Fruits, Vegetables',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Maize': '15k - 28k per acre',
        'Potatoes': '18k - 30k per acre',
        'Fruits': 'Varies',
        'Vegetables': 'Varies',
      },
    },
    'Mizoram': {
      crops: 'Rice, Maize, Pulses, Oilseeds, Fruits',
      additionalInfo: {
        'Rice': '22k - 37k per acre',
        'Maize': '20k - 32k per acre',
        'Pulses': '15k - 28k per acre',
        'Oilseeds': '25k - 40k per acre',
        'Fruits': 'Varies',
      },
    },
    'Nagaland': {
      crops: 'Rice, Maize, Millets, Pulses, Oilseeds',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Maize': '12k - 25k per acre',
        'Millets': 'Varies',
        'Pulses': '10k - 22k per acre',
        'Oilseeds': '20k - 35k per acre',
      },
    },
    'Odisha': {
      crops: 'Rice, Pulses, Oilseeds, Sugarcane, Coconut',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Pulses': '12k - 25k per acre',
        'Oilseeds': '18k - 30k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Coconut': '30k - 45k per acre',
      },
    },
    'Puducherry': {
      crops: 'Rice, Sugarcane, Pulses, Groundnut, Coconut',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Sugarcane': '60k - 90k per acre',
        'Pulses': '15k - 28k per acre',
        'Groundnut': '18k - 30k per acre',
        'Coconut': '35k - 50k per acre',
      },
    },
    'Punjab': {
      crops: 'Wheat, Rice, Barley, Sugarcane, Cotton',
      additionalInfo: {
        'Wheat': '22k - 35k per acre',
        'Rice': '20k - 32k per acre',
        'Barley': '15k - 28k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Cotton': '30k - 45k per acre',
      },
    },
    'Rajasthan': {
      crops: 'Wheat, Barley, Mustard, Pulses, Oilseeds',
      additionalInfo: {
        'Wheat': '20k - 35k per acre',
        'Barley': '15k - 28k per acre',
        'Mustard': '18k - 30k per acre',
        'Pulses': '12k - 25k per acre',
        'Oilseeds': '22k - 37k per acre',
      },
    },
    'Sikkim': {
      crops: 'Rice, Maize, Cardamom, Potatoes, Ginger',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Maize': '18k - 30k per acre',
        'Cardamom': '40k - 60k per acre',
        'Potatoes': '22k - 37k per acre',
        'Ginger': '30k - 45k per acre',
      },
    },
    'Tamil Nadu': {
      crops: 'Rice, Sugarcane, Cotton, Pulses, Groundnut',
      additionalInfo: {
        'Rice': '22k - 37k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Cotton': '30k - 45k per acre',
        'Pulses': '18k - 30k per acre',
        'Groundnut': '20k - 35k per acre',
      },
    },
    'Telangana': {
      crops: 'Rice, Red gram (Pigeon pea), Cotton, Maize, Groundnut',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Red gram (Pigeon pea)': '40k - 60k per acre',
        'Cotton': '35k - 50k per acre',
        'Maize': '20k - 35k per acre',
        'Groundnut': '22k - 37k per acre',
      },
    },
    'Tripura': {
      crops: 'Rice, Sugarcane, Rubber, Tea, Fruits',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Sugarcane': '50k - 75k per acre',
        'Rubber': '60k - 85k per acre',
        'Tea': '35k - 50k per acre',
        'Fruits': '25k - 40k per acre',
      },
    },
    'Uttar Pradesh': {
      crops: 'Rice, Wheat, Sugarcane, Pulses, Barley',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Wheat': '30k - 45k per acre',
        'Sugarcane': '60k - 85k per acre',
        'Pulses': '25k - 40k per acre',
        'Barley': '22k - 37k per acre',
      },
    },
    'Uttarakhand': {
      crops: 'Rice, Wheat, Millets, Oilseeds, Pulses',
      additionalInfo: {
        'Rice': '23k - 38k per acre',
        'Wheat': '32k - 47k per acre',
        'Millets': '28k - 43k per acre',
        'Oilseeds': '26k - 41k per acre',
        'Pulses': '24k - 39k per acre',
      },
    },
    'West Bengal': {
      crops: 'Rice, Jute, Sugarcane, Potato, Wheat',
      additionalInfo: {
        'Rice': '21k - 36k per acre',
        'Jute': '38k - 53k per acre',
        'Sugarcane': '58k - 83k per acre',
        'Potato': '30k - 45k per acre',
        'Wheat': '28k - 43k per acre',
      },
    },
  };
  

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className='homecontainer'>
      <div className='container1'>
      <div className='slide'>
        <label id='mainmenu'>Main Menu and Options</label>
        <button  id="slide-button" onClick={() => navigate('/government')}>
        Government
        </button>
        <button  id="slide-button" onClick={() => navigate('/servicetype')}>
        Service Type
        </button>
        <button  id="slide-button"  onClick={() => navigate('/schemes')}>
        Schemes
        </button>
        <button  id="slide-button" onClick={() => navigate('/form')}>
        Forms
        </button>
        <button  id="slide-button" onClick={() => navigate('/documents')} >
        Documents
        </button>
        <button  id="slide-button" onClick={() => navigate('/grievances')}>
        Grievances
        </button>
        <button  id="slide-button" onClick={() => navigate('/aboutus')}>
        About
        </button>
        

      </div>
      <div className="container2">
        <div className='selecthome'>
        <label id="stateSelector">Select Block:</label>
        <select id="stateSelector" value={selectedState} onChange={handleStateChange}>
          {allStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        </div>

        <iframe
          src={stateIframes[selectedState]}
          width="800"
          height="480"
          style={{ border: '5' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className='slide1'>
      <h2 id='selectstate'>Crop Information for {selectedState}:</h2>
          <h5 id='selectstate'>{cropInformation[selectedState].crops}</h5>
          <h3>Additional Information For Crop Loan:</h3>
          <h6 id='selectstate'>
          <ul>
            {Object.entries(cropInformation[selectedState].additionalInfo).map(([crop, info]) => (
              <li id='selectstate' key={crop}>{crop}: {info}</li>
            ))}
          </ul>
          </h6>
      </div>
      </div>
      <Footer />
      </div>
    </>
  );
};


export default HomePage;



/*

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('India');
  const allStates = [
    'India',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'

  ];

  const stateIframes = {
    'India': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27841607.697473545!2d61.00083698256399!3d19.729113061269327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e1!3m2!1sen!2sin!4v1705943972947!5m2!1sen!2sin',
    'Andhra Pradesh': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556050.642223363!2d78.11857159210197!3d15.88470629531562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3546f8ae93d47f%3A0x33d1bbbe95adcd83!2sAndhra%20Pradesh!5e1!3m2!1sen!2sin!4v1705940179208!5m2!1sen!2sin',
    'Arunachal Pradesh': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5554824.693466073!2d91.82761104790535!3d26.702843281800742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374043466a1c7227%3A0x76b56e552f9a92f2!2sArunachal%20Pradesh!5e1!3m2!1sen!2sin!4v1705940670614!5m2!1sen!2sin',
    'Assam':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954783.9234073116!2d90.48243811156762!3d25.91099114728845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374516c94c312d63%3A0xd11a73bb736719fb!2sAssam!5e1!3m2!1sen!2sin!4v1705940749989!5m2!1sen!2sin',
    'Bihar':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1662930.8113846695!2d84.48741880342862!3d25.900420866050737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5844f0bb6903%3A0x57ad3fed1bbae325!2sBihar!5e1!3m2!1sen!2sin!4v1705940785195!5m2!1sen!2sin',
    'Chandigarh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99312.65761196072!2d76.68831172108813!3d30.73240198353569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e1!3m2!1sen!2sin!4v1705940818976!5m2!1sen!2sin',
    'Chhattisgarh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453300.13179803!2d79.67781471344013!3d20.929095127388848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a261f16c67a8bad%3A0x5c23f412fb179d95!2sChhattisgarh!5e1!3m2!1sen!2sin!4v1705940862477!5m2!1sen!2sin',
    'Delhi':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405592.18224753055!2d76.76356891374634!3d28.644287353477026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e1!3m2!1sen!2sin!4v1705940940166!5m2!1sen!2sin',
    'Goa':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d891334.5092660676!2d73.3471910483667!3d15.350084489106958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfba106336b741%3A0xeaf887ff62f34092!2sGoa!5e1!3m2!1sen!2sin!4v1705940971057!5m2!1sen!2sin',
    'Gujarat':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418273.224911567!2d68.6848901800457!3d22.39949680100548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959051f5f0ef795%3A0x861bd887ed54522e!2sGujarat!5e1!3m2!1sen!2sin!4v1705940999961!5m2!1sen!2sin',
    'Haryana':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225213.578766426!2d73.39734871535734!3d29.269222408606538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db00b8670400b%3A0x732eaab4aaa6c143!2sHaryana!5e1!3m2!1sen!2sin!4v1705941024093!5m2!1sen!2sin',
    'Himachal Pradesh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1570914.046289826!2d75.98225615094162!3d31.812410115381585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390453c367f901f7%3A0x7cfe04c5564b7725!2sHimachal%20Pradesh!5e1!3m2!1sen!2sin!4v1705941054319!5m2!1sen!2sin',
    'Jharkhand':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386911.4129266567!2d83.00408654239011!3d23.642306315273462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b2386df480857%3A0x62c5b809eee29004!2sJharkhand!5e1!3m2!1sen!2sin!4v1705941110494!5m2!1sen!2sin',
    'Karnataka':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570814.4940177365!2d73.67836452464988!3d15.026145535732317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x41f1d28cd1757cd5!2sKarnataka!5e1!3m2!1sen!2sin!4v1705941138929!5m2!1sen!2sin',
    'Kerala':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634864.945156061!2d73.49571820655787!3d10.538724802775436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0812ffd49cf55b%3A0x64bd90fbed387c99!2sKerala!5e1!3m2!1sen!2sin!4v1705941166647!5m2!1sen!2sin',
    'Madhya Pradesh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378833.6057803426!2d75.77901875062899!3d23.952542150668382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39667381d35aea05%3A0xe0106b0d4e701c1e!2sMadhya%20Pradesh!5e1!3m2!1sen!2sin!4v1705941193406!5m2!1sen!2sin',
    'Maharashtra':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499882.0696501457!2d74.12754026814912!3d18.804785566251468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e1!3m2!1sen!2sin!4v1705941230485!5m2!1sen!2sin',
    'Manipur':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1678683.4829058137!2d92.53745062869845!3d24.75920466780984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3749265bf16390db%3A0x8cc1691ae0a829af!2sManipur!5e1!3m2!1sen!2sin!4v1705941263506!5m2!1sen!2sin',
    'Meghalaya':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1667556.1760281315!2d89.99170719708209!3d25.57026586280484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37507e8f34bd207f%3A0xf5ef6117f496d6e!2sMeghalaya!5e1!3m2!1sen!2sin!4v1705941289172!5m2!1sen!2sin',
    'Mizoram':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1698769.7452949402!2d91.52775449667067!3d23.228180243305278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374d0bd19f3f36f7%3A0xb1f62692a3d5e474!2sMizoram!5e1!3m2!1sen!2sin!4v1705941342824!5m2!1sen!2sin',
    'Nagaland':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1659919.9584003915!2d92.96443430443384!3d26.113243415993175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3746210934c63d31%3A0x1f2df33a89cc3efd!2sNagaland!5e1!3m2!1sen!2sin!4v1705941370757!5m2!1sen!2sin',
    'Odisha':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470373.677830372!2d81.79503742675237!3d20.175410475835836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a226aece9af3bfd%3A0x133625caa9cea81f!2sOdisha!5e1!3m2!1sen!2sin!4v1705941462162!5m2!1sen!2sin',
    'Puducherry':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56520.15041981339!2d79.77232808421613!3d11.93637627992996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361ab8e49cfcf%3A0xcc6bd326d2f0b04e!2sPuducherry!5e1!3m2!1sen!2sin!4v1705941492129!5m2!1sen!2sin',
    'Punjab':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1584199.6726602342!2d74.0915094442751!3d31.022460752774915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964aa569e7355%3A0x8fbd263103a38861!2sPunjab!5e1!3m2!1sen!2sin!4v1705942959923!5m2!1sen!2sin',
    'Rajasthan':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6615240.854649487!2d68.58302389010609!3d26.54023242347269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396a3efaf7e30e37%3A0xb52b9b4506c088e5!2sRajasthan!5e1!3m2!1sen!2sin!4v1705941528033!5m2!1sen!2sin',
    'Sikkim':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d819140.9694092633!2d87.80712034315454!3d27.59786044091011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56a5805eafb%3A0xa4c4b857c39b5a04!2sSikkim!5e1!3m2!1sen!2sin!4v1705943054430!5m2!1sen!2sin',
    'Tamil Nadu':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631557.94482553!2d75.64712472020913!3d10.815335686123108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0x559475cc463361f0!2sTamil%20Nadu!5e1!3m2!1sen!2sin!4v1705941598993!5m2!1sen!2sin',
    'Telangana':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3518981.3285525027!2d76.63685376169961!3d17.86384441282973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3350db9429ed43%3A0x63ef7ba741594059!2sTelangana!5e1!3m2!1sen!2sin!4v1705941624413!5m2!1sen!2sin',
    'Tripura':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d846130.2876850675!2d91.08138422136412!3d23.734504462195492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753b566f6c1a285%3A0x14dd7ae7453fff74!2sTripura!5e1!3m2!1sen!2sin!4v1705941649217!5m2!1sen!2sin',
    'Uttar Pradesh':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6585660.702406385!2d75.56423102915275!3d27.048675611804093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39994e9f7b4a09d3%3A0xf6a5476d3617249d!2sUttar%20Pradesh!5e1!3m2!1sen!2sin!4v1705941679762!5m2!1sen!2sin',
    'Uttarakhand':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1599547.5973911197!2d77.98922309154719!3d30.086710545047307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909dcc202279c09%3A0x7c43b63689cc005!2sUttarakhand!5e1!3m2!1sen!2sin!4v1705941708995!5m2!1sen!2sin',
    'West Bengal':'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368175.299455393!2d85.20918773509327!3d24.356190537775895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fa16ff1397e887%3A0x71543a3dc3e7a20a!2sWest%20Bengal!5e1!3m2!1sen!2sin!4v1705941737351!5m2!1sen!2sin',
  };

  const cropInformation = {
    'India': {
      crops: 'Rice, Wheat, Millets (such as sorghum and pearl millet), Pulses (like chickpeas, lentils, and peas), Sugarcane',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Wheat': '15k - 30k per acre',
        'Millets': 'Varies',
        'Pulses': '10k - 25k per acre',
        'Sugarcane': '50k - 80k per acre',
      },
    },
    'Andhra Pradesh': {
      crops: 'Rice, Groundnut, Sugarcane, Cotton, Red gram (Pigeon pea)',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Groundnut': '18k - 30k per acre',
        'Sugarcane': '60k - 90k per acre',
        'Cotton': '30k - 45k per acre',
        'Red gram': '20k - 35k per acre',
      },
    },
    'Arunachal Pradesh': {
      crops: 'Rice, Maize, Millets, Buckwheat, Ginger and large cardamom',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Maize': '12k - 25k per acre',
        'Millets': 'Varies',
        'Buckwheat': '15k - 28k per acre',
        'Ginger and large cardamom': '25k - 40k per acre',
      },
    },
    'Assam': {
      crops: 'Rice, Tea, Jute, Sugarcane, Fruits (such as oranges and bananas)',
      additionalInfo: {
        'Rice': '22k - 37k per acre',
        'Tea': '30k - 50k per acre',
        'Jute': '25k - 40k per acre',
        'Sugarcane': '55k - 85k per acre',
        'Fruits': 'Varies',
      },
    },
    'Bihar': {
      crops: 'Rice, Wheat, Maize, Pulses, Sugarcane',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Wheat': '18k - 32k per acre',
        'Maize': '15k - 28k per acre',
        'Pulses': '12k - 22k per acre',
        'Sugarcane': '60k - 90k per acre',
      },
    },
    'Chandigarh': {
      crops: 'Wheat, Rice, Barley, Vegetables, Fruits',
      additionalInfo: {
        'Wheat': '22k - 35k per acre',
        'Rice': '20k - 32k per acre',
        'Barley': '15k - 28k per acre',
        'Vegetables': 'Varies',
        'Fruits': 'Varies',
      },
    },
    'Chhattisgarh': {
      crops: 'Rice, Maize, Pulses, Oilseeds, Sugarcane',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Maize': '14k - 25k per acre',
        'Pulses': '12k - 22k per acre',
        'Oilseeds': '20k - 35k per acre',
        'Sugarcane': '55k - 80k per acre',
      },
    },
    'Delhi': {
      crops: 'Wheat, Rice, Pulses, Fruits, Vegetables',
      additionalInfo: {
        'Wheat': '25k - 40k per acre',
        'Rice': '20k - 35k per acre',
        'Pulses': '15k - 28k per acre',
        'Fruits': 'Varies',
        'Vegetables': 'Varies',
      },
    },
    'Goa': {
      crops: 'Rice, Coconut, Cashew, Kokum, Betel nut',
      additionalInfo: {
        'Rice': '22k - 35k per acre',
        'Coconut': '30k - 45k per acre',
        'Cashew': '40k - 60k per acre',
        'Kokum': '25k - 40k per acre',
        'Betel nut': '35k - 50k per acre',
      },
    },
    'Gujarat': {
      crops: 'Cotton, Groundnut, Rice, Wheat, Sugarcane',
      additionalInfo: {
        'Cotton': '30k - 45k per acre',
        'Groundnut': '25k - 40k per acre',
        'Rice': '20k - 35k per acre',
        'Wheat': '18k - 32k per acre',
        'Sugarcane': '60k - 90k per acre',
      },
    },
    'Haryana': {
      crops: 'Wheat, Rice, Sugarcane, Barley, Mustard',
      additionalInfo: {
        'Wheat': '22k - 35k per acre',
        'Rice': '20k - 32k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Barley': '15k - 28k per acre',
        'Mustard': '18k - 30k per acre',
      },
    },
    'Himachal Pradesh': {
      crops: 'Apples, Potatoes, Barley, Maize, Wheat',
      additionalInfo: {
        'Apples': '40k - 60k per acre',
        'Potatoes': '25k - 40k per acre',
        'Barley': '18k - 30k per acre',
        'Maize': '15k - 28k per acre',
        'Wheat': '20k - 35k per acre',
      },
    },
    'Jharkhand': {
      crops: 'Rice, Maize, Pulses, Oilseeds, Vegetables',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Maize': '15k - 28k per acre',
        'Pulses': '12k - 22k per acre',
        'Oilseeds': '18k - 30k per acre',
        'Vegetables': 'Varies',
      },
    },
    'Karnataka': {
      crops: 'Rice, Sugarcane, Coconut, Ragi, Groundnut',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Sugarcane': '60k - 90k per acre',
        'Coconut': '35k - 50k per acre',
        'Ragi': '20k - 35k per acre',
        'Groundnut': '18k - 30k per acre',
      },
    },
    'Kerala': {
      crops: 'Coconut, Rubber, Rice, Pepper, Cardamom',
      additionalInfo: {
        'Coconut': '30k - 45k per acre',
        'Rubber': '40k - 60k per acre',
        'Rice': '22k - 37k per acre',
        'Pepper': '35k - 50k per acre',
        'Cardamom': '45k - 70k per acre',
      },
    },
    'Madhya Pradesh': {
      crops: 'Wheat, Rice, Soybeans, Gram (Chana), Maize',
      additionalInfo: {
        'Wheat': '22k - 35k per acre',
        'Rice': '20k - 32k per acre',
        'Soybeans': '25k - 40k per acre',
        'Gram (Chana)': '18k - 30k per acre',
        'Maize': '15k - 28k per acre',
      },
    },
    'Maharashtra': {
      crops: 'Sugarcane, Cotton, Soybeans, Groundnut, Rice',
      additionalInfo: {
        'Sugarcane': '55k - 80k per acre',
        'Cotton': '30k - 45k per acre',
        'Soybeans': '25k - 40k per acre',
        'Groundnut': '20k - 35k per acre',
        'Rice': '22k - 37k per acre',
      },
    },
    'Manipur': {
      crops: 'Rice, Maize, Sugarcane, Pulses, Fruits',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Maize': '14k - 25k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Pulses': '12k - 22k per acre',
        'Fruits': 'Varies',
      },
    },
    'Meghalaya': {
      crops: 'Rice, Maize, Potatoes, Fruits, Vegetables',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Maize': '15k - 28k per acre',
        'Potatoes': '18k - 30k per acre',
        'Fruits': 'Varies',
        'Vegetables': 'Varies',
      },
    },
    'Mizoram': {
      crops: 'Rice, Maize, Pulses, Oilseeds, Fruits',
      additionalInfo: {
        'Rice': '22k - 37k per acre',
        'Maize': '20k - 32k per acre',
        'Pulses': '15k - 28k per acre',
        'Oilseeds': '25k - 40k per acre',
        'Fruits': 'Varies',
      },
    },
    'Nagaland': {
      crops: 'Rice, Maize, Millets, Pulses, Oilseeds',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Maize': '12k - 25k per acre',
        'Millets': 'Varies',
        'Pulses': '10k - 22k per acre',
        'Oilseeds': '20k - 35k per acre',
      },
    },
    'Odisha': {
      crops: 'Rice, Pulses, Oilseeds, Sugarcane, Coconut',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Pulses': '12k - 25k per acre',
        'Oilseeds': '18k - 30k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Coconut': '30k - 45k per acre',
      },
    },
    'Puducherry': {
      crops: 'Rice, Sugarcane, Pulses, Groundnut, Coconut',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Sugarcane': '60k - 90k per acre',
        'Pulses': '15k - 28k per acre',
        'Groundnut': '18k - 30k per acre',
        'Coconut': '35k - 50k per acre',
      },
    },
    'Punjab': {
      crops: 'Wheat, Rice, Barley, Sugarcane, Cotton',
      additionalInfo: {
        'Wheat': '22k - 35k per acre',
        'Rice': '20k - 32k per acre',
        'Barley': '15k - 28k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Cotton': '30k - 45k per acre',
      },
    },
    'Rajasthan': {
      crops: 'Wheat, Barley, Mustard, Pulses, Oilseeds',
      additionalInfo: {
        'Wheat': '20k - 35k per acre',
        'Barley': '15k - 28k per acre',
        'Mustard': '18k - 30k per acre',
        'Pulses': '12k - 25k per acre',
        'Oilseeds': '22k - 37k per acre',
      },
    },
    'Sikkim': {
      crops: 'Rice, Maize, Cardamom, Potatoes, Ginger',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Maize': '18k - 30k per acre',
        'Cardamom': '40k - 60k per acre',
        'Potatoes': '22k - 37k per acre',
        'Ginger': '30k - 45k per acre',
      },
    },
    'Tamil Nadu': {
      crops: 'Rice, Sugarcane, Cotton, Pulses, Groundnut',
      additionalInfo: {
        'Rice': '22k - 37k per acre',
        'Sugarcane': '55k - 80k per acre',
        'Cotton': '30k - 45k per acre',
        'Pulses': '18k - 30k per acre',
        'Groundnut': '20k - 35k per acre',
      },
    },
    'Telangana': {
      crops: 'Rice, Red gram (Pigeon pea), Cotton, Maize, Groundnut',
      additionalInfo: {
        'Rice': '25k - 40k per acre',
        'Red gram (Pigeon pea)': '40k - 60k per acre',
        'Cotton': '35k - 50k per acre',
        'Maize': '20k - 35k per acre',
        'Groundnut': '22k - 37k per acre',
      },
    },
    'Tripura': {
      crops: 'Rice, Sugarcane, Rubber, Tea, Fruits',
      additionalInfo: {
        'Rice': '18k - 30k per acre',
        'Sugarcane': '50k - 75k per acre',
        'Rubber': '60k - 85k per acre',
        'Tea': '35k - 50k per acre',
        'Fruits': '25k - 40k per acre',
      },
    },
    'Uttar Pradesh': {
      crops: 'Rice, Wheat, Sugarcane, Pulses, Barley',
      additionalInfo: {
        'Rice': '20k - 35k per acre',
        'Wheat': '30k - 45k per acre',
        'Sugarcane': '60k - 85k per acre',
        'Pulses': '25k - 40k per acre',
        'Barley': '22k - 37k per acre',
      },
    },
    'Uttarakhand': {
      crops: 'Rice, Wheat, Millets, Oilseeds, Pulses',
      additionalInfo: {
        'Rice': '23k - 38k per acre',
        'Wheat': '32k - 47k per acre',
        'Millets': '28k - 43k per acre',
        'Oilseeds': '26k - 41k per acre',
        'Pulses': '24k - 39k per acre',
      },
    },
    'West Bengal': {
      crops: 'Rice, Jute, Sugarcane, Potato, Wheat',
      additionalInfo: {
        'Rice': '21k - 36k per acre',
        'Jute': '38k - 53k per acre',
        'Sugarcane': '58k - 83k per acre',
        'Potato': '30k - 45k per acre',
        'Wheat': '28k - 43k per acre',
      },
    },
  };
  

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className='homecontainer'>
      <div className='container1'>
      <div className='slide'>
        <label id='mainmenu'>Main Menu and Options</label>
        <button  id="slide-button" onClick={() => navigate('/government')}>
        Government
        </button>
        <button  id="slide-button" onClick={() => navigate('/servicetype')}>
        Service Type
        </button>
        <button  id="slide-button"  onClick={() => navigate('/schemes')}>
        Schemes
        </button>
        <button  id="slide-button" onClick={() => navigate('/form')}>
        Forms
        </button>
        <button  id="slide-button" onClick={() => navigate('/documents')} >
        Documents
        </button>
        <button  id="slide-button" onClick={() => navigate('/grievances')}>
        Grievances
        </button>
        <button  id="slide-button" onClick={() => navigate('/aboutus')}>
        About
        </button>
        

      </div>
      <div className="container2">
        <div className='selecthome'>
        <label id="stateSelector">Select Block:</label>
        <select id="stateSelector" value={selectedState} onChange={handleStateChange}>
          {allStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        </div>

        <iframe
          src={stateIframes[selectedState]}
          width="800"
          height="480"
          style={{ border: '5' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className='slide1'>
      <h2 id='selectstate'>Crop Information for {selectedState}:</h2>
          <h5 id='selectstate'>{cropInformation[selectedState].crops}</h5>
          <h3>Additional Information For Crop Loan:</h3>
          <h6 id='selectstate'>
          <ul>
            {Object.entries(cropInformation[selectedState].additionalInfo).map(([crop, info]) => (
              <li id='selectstate' key={crop}>{crop}: {info}</li>
            ))}
          </ul>
          </h6>
      </div>
      </div>
      <Footer />
      </div>
    </>
  );
};


export default HomePage;

/*
*/