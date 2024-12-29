// src/FlashCard.js
import React from 'react';

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
        <label>
          {flashData.Item1}, {flashData.Item2}, {flashData.Item3}
        </label>

      </div>
    );
  };
  

export default FlashCard;
