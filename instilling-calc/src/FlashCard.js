// src/FlashCard.js
import React from 'react';

// src/FlashCard.js
const FlashCard = ({ flashData }) => {
    //console.log('FlashCard received data:', flashData);  // Check if data is passed to the component
    return (
      <div className="flash-card">
      <h2>
        <a href={flashData.URL} target="_blank" rel="noopener noreferrer">
          {flashData.Name}
        </a>
      </h2>
        <p>{flashData.Description}</p>
        <ul>
          <li>{flashData.Item1}</li>
          <li>{flashData.Item2}</li>
          <li>{flashData.Item3}</li>
        </ul>
      </div>
    );
  };
  

export default FlashCard;
