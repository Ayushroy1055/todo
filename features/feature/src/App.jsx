// File: App.js
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const App = () => {
  // State to track whether the toggle menu is visible
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // State to track the visibility state (eye open/closed)
  const [isEyeOpen, setIsEyeOpen] = useState(() => {
    // Retrieve initial state from localStorage
    const savedState = localStorage.getItem('eyeState');
    return savedState === 'true'; // Convert string to boolean
  });

  // Function to toggle the visibility of the menu
  const handleMenuToggle = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // Function to handle selection of "eye open" or "eye closed"
  const handleSelection = (state) => {
    setIsEyeOpen(state);
    localStorage.setItem('eyeState', state); // Save to localStorage
    // Do not close the menu here; instead, let the outside click event handle it
    // setIsMenuVisible(false); // Commented out to prevent immediate closure
  };

  // Use effect to attach event listener to document
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.main-button') === null && event.target.closest('.menu') === null && event.target.closest('.option-button') === null) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>React Eye Toggle Feature</h1>
      
      {/* Button to open/close the toggle menu */}
      <button className="main-button" onClick={handleMenuToggle} style={styles.mainButton}>
        {isEyeOpen ? 'Current State: Eye Open' : 'Current State: Eye Closed'}
      </button>

      {/* Toggle menu (conditionally rendered) */}
      {isMenuVisible && (
        <div className="menu" style={styles.menu}>
          <button className="option-button" onClick={() => handleSelection(true)} style={styles.optionButton}>
            Open Eye
          </button>
          <button className="option-button" onClick={() => handleSelection(false)} style={styles.optionButton}>
            Close Eye
          </button>
        </div>
      )}
    </div>
  );
};

// Styling for the component
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  header: {
    fontSize: '24px', 
    marginBottom: '20px',
  },
  mainButton: {
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
  },
  menu: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  optionButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#28A745',
    color: '#fff',
    border: 'none',
  },
};

export default App;
//main