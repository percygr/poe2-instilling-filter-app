// src/EmotionInput.js
import React from "react";

function EmotionInput({ emotion, value, onIncrease, onDecrease, imageSrc }) {
  return (
    <div className="emotion-input">
      
      <img src={imageSrc} alt={emotion} />
      <div>
      <label>{emotion}</label>
        <div className="arrow-container">
            <button className="arrow-button up" onClick={onIncrease}>↑</button>
            <span className="number-display">{value}</span>
            <button className="arrow-button down" onClick={onDecrease}>↓</button>
        </div>
      </div>
    </div>
  );
}

export default EmotionInput;
