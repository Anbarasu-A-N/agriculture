


import React, { useState, useRef } from 'react';
import "./ServiceType.css";
import Footer from './Footer';
import Navbar from './Navbar';


const ServiceType = () => {
  const topics = ['Crop Loan', 'Agri Land Loan', 'Machine Loan', 'Infrastructure Loan', 'Dairy Farm Loan'];

  // State to track the selected topic
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Refs to get the positions of each topic and detail section
  const detailContainerRef = useRef(null);
  const topicRefs = topics.map(() => useRef(null));
  const detailRefs = topics.map(() => useRef(null));

  // Function to handle topic click and scroll to the corresponding detail
  const handleTopicClick = (index) => {
    setSelectedTopic(index);
    detailRefs[index].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Function to handle detail scroll and change topic color
  const handleDetailScroll = () => {
    const scrollY = detailContainerRef.current.scrollTop;

    // Check which topic is currently in view and update its style
    topicRefs.forEach((ref, index) => {
      const offsetTop = ref.current.offsetTop;
      const offsetBottom = offsetTop + ref.current.clientHeight;

      /*


      if (scrollY >= offsetTop && scrollY <= offsetBottom) {
        // Set the active topic's style
        ref.current.style.color = 'rgb(0, 255, 128)';
      } else {
        // Reset other topics' styles
        ref.current.style.color = 'black';
      }

      */

    });
  };

  return (
    <>
    <Navbar/>
    <div className='servicetypebgcolor'>
    <h1 id='servicetype'>Service Type</h1>
      <div className='servicetypetitle'>
        
        <div className='servicetypetitle1'>
          {topics.map((topic, index) => (
            <div
              key={index}
              ref={topicRefs[index]}
              onClick={() => handleTopicClick(index)}
              className={`topic ${selectedTopic === index ? 'active' : ''}`}
            >
              {topic}
            </div>
          ))}
        </div>

        <div
          className='servicetypetitle2'
          
          ref={detailContainerRef}
          onScroll={handleDetailScroll}
        >
          {topics.map((topic, index) => (
            <div key={index} ref={detailRefs[index]} style={{ marginBottom: '50px' }}>
              <h2 id='servicetype' >{topic}</h2>
              <p id='servicetype'>

              {topic === 'Crop Loan' && (
                <>
                   Crop loans are indispensable financial instruments for the agricultural sector, serving as a lifeline for farmers to meet the diverse financial needs throughout the cropping cycle. These loans play a pivotal role in empowering farmers by providing essential capital for procuring seeds, fertilizers, pesticides, and other inputs critical for successful crop cultivation. Tailored to the cyclical nature of farming, crop loans are typically disbursed ahead of planting seasons, ensuring timely access to funds. The repayment structure is intricately linked to the crop cycle, allowing farmers to settle their dues post-harvest when they generate income from the sale of their produce. In addition to facilitating agricultural operations, crop loans contribute significantly to rural development, food security, and the overall economic stability of farming communities.
                </>
              )}
              {topic === 'Agri Land Loan' && (
                <>
                  Agricultural land loans serve as a cornerstone for the expansion and development of farming enterprises. These financial tools empower farmers to acquire, develop, or improve agricultural land, fostering sustainable practices and increasing overall productivity. Agri land loans cover a spectrum of expenses, ranging from land acquisition to investments in irrigation systems and infrastructure development. The flexible repayment terms acknowledge the seasonal income fluctuations in agriculture, ensuring that farmers can comfortably meet their financial obligations. By facilitating land ownership and development, agri land loans contribute not only to individual farm growth but also to the broader landscape of rural economic progress and agricultural sustainability.
                </>
              )}
              {topic === 'Machine Loan' && (
                <>
                  Machine loans represent a transformative force in modernizing agriculture, offering farmers the financial means to invest in cutting-edge machinery and equipment. These loans are instrumental in the acquisition of tractors, harvesters, irrigation systems, and other advanced agricultural technologies. The infusion of mechanization into farming operations enhances efficiency, reduces labor dependency, and ultimately leads to increased crop yields. Machine loans come with repayment structures tailored to the cyclical nature of agricultural income, ensuring that farmers can comfortably repay the loans while benefiting from the improved productivity and profitability brought about by mechanized processes.
                </>
              )}
              {topic === 'Infrastructure Loan' && (
                <>
                  Agriculture infrastructure loans form the bedrock of comprehensive development within the agricultural sector. These loans are directed towards funding critical facilities and structures, such as storage units, processing plants, and transportation infrastructure. By investing in agricultural infrastructure, farmers can mitigate post-harvest losses, enhance the value chain, and improve market access. The repayment terms for infrastructure loans are designed to align with the expected economic gains resulting from the upgraded facilities. This strategic approach not only bolsters individual farm operations but also contributes to the overall resilience and competitiveness of the agricultural sector.
                </>
              )}
              {topic === 'Dairy Farm Loan' && (
                <>
                  Dairy farm loans are specialized financial tools designed to meet the nuanced requirements of dairy farming enterprises. These loans cover a gamut of expenses, including the acquisition of dairy cattle, procurement of quality feed, veterinary care, and investments in dairy processing equipment. The repayment schedules for dairy farm loans are intricately linked to the regularity of milk production and sales, ensuring that farmers can comfortably meet their financial commitments. Beyond individual farm sustainability, these loans play a crucial role in fostering the growth of the dairy industry, promoting modern practices, and meeting the rising demands of the dairy market.
                </>
              )}
            </p>
            </div>
          ))}
        </div>
      </div>
      </div>
   
      <Footer />
    </>
  );
};

export default ServiceType;


/*

import React, { useState, useRef, useEffect } from 'react';
import "./ServiceType.css";

const ServiceType = () => {
  const topics = ['Crop Loan', 'Agri Land Loan', 'Machine Loan', 'Infrastructure Loan', 'Dairy Farm Loan'];

  // State to track the scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // Refs to get the positions of each topic and detail section
  const topicRefs = topics.map(() => useRef(null));
  const detailRefs = topics.map(() => useRef(null));

  // Function to handle topic click and scroll to the corresponding detail
  const handleTopicClick = (index) => {
    detailRefs[index].current.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to handle detail scroll and change topic color
  const handleDetailScroll = () => {
    const scrollY = window.scrollY;
    setScrollPosition(scrollY);

    // Check which topic is currently in view and update its style
    topicRefs.forEach((ref, index) => {
      const offsetTop = ref.current.offsetTop;
      const offsetBottom = offsetTop + ref.current.clientHeight;

      if (scrollY >= offsetTop && scrollY <= offsetBottom) {
        // Set the active topic's style
        ref.current.style.color = 'red';
      } else {
        // Reset other topics' styles
        ref.current.style.color = 'black';
      }
    });
  };

  // Add scroll event listener to handle changing topic color on scroll
  useEffect(() => {
    window.addEventListener('scroll', handleDetailScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleDetailScroll);
    };
  }, []);

  return (
    <>
    <div className='servicetypetitle'>

      <div className='servicetypetitle1' style={{ float: 'left', width: '30%' }}>
        {topics.map((topic, index) => (
          <div
            key={index}
            ref={topicRefs[index]}
            onClick={() => handleTopicClick(index)}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            {topic}
          </div>
        ))}
      </div>

      <div className='servicetypetitle2' style={{ float: 'right', width: '70%', position: 'relative' }}>
        {topics.map((topic, index) => (
          <div key={index} ref={detailRefs[index]} style={{ marginBottom: '500px' }}>

            <h2>{topic}</h2>
            <p>

              {topic === 'Crop Loan' && (
                <>
                  A crop loan is a type of short-term financial assistance provided to farmers to meet the various expenses associated with the cultivation of crops. Farmers often require funds to purchase seeds, fertilizers, pesticides, and cover labor costs during the planting and harvesting seasons. Crop loans are essential for ensuring that farmers have the necessary resources to achieve a successful harvest. These loans are typically structured to align with the cropping seasons and may have flexible repayment terms.
                </>
              )}
              {topic === 'Agri Land Loan' && (
                <>
                  An agricultural land loan is designed to facilitate the purchase or development of agricultural land. Farmers often need financial support to acquire additional land for cultivation or to enhance existing farmland. These loans can cover the costs associated with buying agricultural land, making improvements to the land, or investing in irrigation systems. Agricultural land loans play a crucial role in expanding farming operations, promoting agricultural productivity, and contributing to overall food security.
                </>
              )}
              {topic === 'Machine Loan' && (
                <>
                  Agricultural machine loans are financial products tailored to assist farmers in acquiring machinery and equipment necessary for modern and efficient farming practices. This includes tractors, plows, harvesters, irrigation systems, and other specialized equipment. Investing in agricultural machinery helps farmers increase productivity, reduce labor costs, and improve the overall efficiency of their operations. These loans often come with flexible repayment options, allowing farmers to match repayments with their seasonal cash flows.
                </>
              )}
              {topic === 'Infrastructure Loan' && (
                <>
                  Farm infrastructure loans focus on providing financial support for the development of essential structures and facilities on the farm. This can include construction of storage facilities, barns, warehouses, and other infrastructure needed for efficient farming and storage of agricultural produce. Infrastructure loans contribute to the overall sustainability of farming operations by enhancing the storage capacity, ensuring proper handling of crops, and reducing post-harvest losses.
                </>
              )}
              {topic === 'Dairy Farm Loan' && (
                <>
                  Dairy farm loans are designed to support farmers engaged in dairy farming by providing financial assistance for various needs. This includes purchasing dairy animals, investing in equipment like milking machines, improving fodder cultivation, and constructing or upgrading dairy facilities. These loans play a crucial role in the development and expansion of dairy farms, contributing to increased milk production and the overall growth of the dairy industry. Dairy farm loans are vital for ensuring the well-being of dairy animals and maintaining the quality of dairy products. They also promote sustainable and efficient dairy farming practices.
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ServiceType;


/*
*/