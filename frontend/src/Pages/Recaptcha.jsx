

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setVerificationSuccess } from '../redux/actions';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './Recaptcha.css';

const generateRandomLetter = (excludeLetters) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const availableLetters = [...letters].filter(letter => !excludeLetters.includes(letter));
  const randomIndex = Math.floor(Math.random() * availableLetters.length);
  return availableLetters[randomIndex];
};

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const generateRandomWord = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomWord = '';
  const uniqueIndexes = new Set();

  while (uniqueIndexes.size < 5) {
    uniqueIndexes.add(Math.floor(Math.random() * letters.length));
  }

  uniqueIndexes.forEach((index) => {
    randomWord += letters.charAt(index);
  });

  return randomWord;
};

const Recaptcha = ({ setVerificationSuccess }) => {
  const [randomWord, setRandomWord] = useState(generateRandomWord());
  const [randomLetters, setRandomLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [robotCheckbox, setRobotCheckbox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const generateRandomLetters = () => {
      const lettersWithWord = [];
      const usedLetters = [];

      for (let i = 0; i < 9; i++) {
        const isWordLetter = i < 5;

        if (isWordLetter) {
          lettersWithWord.push({ letter: randomWord[i], selected: false });
          usedLetters.push(randomWord[i]);
        } else {
          lettersWithWord.push({ letter: generateRandomLetter(usedLetters), selected: false });
        }
      }

      return shuffleArray(lettersWithWord);
    };

    setRandomLetters(generateRandomLetters());
    setVerificationMessage('');
  }, [randomWord]);

  const handleBoxClick = (index) => {
    const selectedLetter = randomLetters[index].letter;

    if (!selectedLetters.includes(selectedLetter)) {
      setSelectedLetters((prevSelectedLetters) => [...prevSelectedLetters, selectedLetter]);
    }
  };

  const verifySelection = () => {
    const selectedWord = selectedLetters.join('');
  
    if (selectedWord === randomWord && robotCheckbox) {
      setVerificationSuccess(true);
      navigate('/payment');
    } else {
      if (!robotCheckbox) {
        setVerificationMessage('Please check the "I am not a robot" box.');
      } else {
        setVerificationMessage('Verification failed. Try again.');
      }
      setVerificationSuccess(false);
    }
  };

  const resetVerification = () => {
    setRandomWord(generateRandomWord());
    setVerificationSuccess(false);
    setSelectedLetters([]);
    setRobotCheckbox(false);
  };

  return (
    <>
    <Navbar/>
    <br/>
      <div className='recaptcha-container'>
        <h1 id='recaptcha'>RECAPTCHA</h1>
        <div className="recaptchacontainer">
          <center>
            <div className='grid-container'>
              <h3 id='recaptcha'>Generated Word: {randomWord}</h3>
              <div className="grid">
                {randomLetters.map((item, index) => (
                  <div
                    key={index}
                    className={`box ${item.selected ? 'selected' : ''}`}
                    onClick={() => handleBoxClick(index)}
                  >
                    {item.letter}
                  </div>
                ))}
              </div>
            </div>
          </center>
          <div id='recaptcha'>
            <div className='recaptcha-check'>
              <p id='select-recaptcha'>Selected Letters:<label id='recaptcha'> {selectedLetters.join('')}</label></p>
              <label id='recaptcha1'>
                <input
                  id='recaptcha1'
                  type="checkbox"
                  checked={robotCheckbox}
                  onChange={() => setRobotCheckbox(!robotCheckbox)}
                  required
                />
                I am not a robot
              </label>
            </div>
            {verificationMessage && <p>{verificationMessage}</p>}
          </div>
        </div>
        <center>
          <button id='recaptcha' onClick={verifySelection}>Verify Selection</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button id='recaptcha' onClick={resetVerification}>Retry Verification</button>
        </center>
      </div>
      <br/>
      <Footer/>
    </>
  );
};

const mapDispatchToProps = {
  setVerificationSuccess,
};

export default connect(null, mapDispatchToProps)(Recaptcha);

