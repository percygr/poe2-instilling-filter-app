import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import EmotionInput from "./EmotionInput";
import './App.css';

function App() {
  const [flashData, setFlashData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // User input state for each emotion
  const [emotionCounts, setEmotionCounts] = useState({
    Despair: 0,
    Disgust: 0,
    Envy: 0,
    Fear: 0,
    Greed: 0,
    Guilt: 0,
    Ire: 0,
    Isolation: 0,
    Paranoia: 0,
    Suffering: 0,
  });

  const emotions = [
    "Despair",
    "Disgust",
    "Envy",
    "Fear",
    "Greed",
    "Guilt",
    "Ire",
    "Isolation",
    "Paranoia",
    "Suffering",
  ];

  // Emotion image placeholder
  const emotionImages = {
    Despair: 'emotion-images/despair.png',
    Disgust: 'emotion-images/disgust.png',
    Envy: 'emotion-images/envy.png',
    Fear: 'emotion-images/fear.png',
    Greed: 'emotion-images/greed.png',
    Guilt: 'emotion-images/guilt.png',
    Ire: 'emotion-images/ire.png',
    Isolation: 'emotion-images/isolation.png',
    Paranoia: 'emotion-images/paranoia.png',
    Suffering: 'emotion-images/suffering.png',
  };

  // Fetch the data from output.json when the component mounts
  useEffect(() => {
    fetch('/output.json')
      .then((response) => response.json())
      .then((data) => {
        setFlashData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // Handle emotion input change
  const handleIncrease = (emotion) => {
    setEmotionCounts((prevAmounts) => {
      const newAmount = prevAmounts[emotion] < 3 ? prevAmounts[emotion] + 1 : 3;
      return { ...prevAmounts, [emotion]: newAmount };
    });
  };

  const handleDecrease = (emotion) => {
    setEmotionCounts((prevAmounts) => {
      const newAmount = prevAmounts[emotion] > 0 ? prevAmounts[emotion] - 1 : 0;
      return { ...prevAmounts, [emotion]: newAmount };
    });
  };

  // Filter items based on user input
  const filteredItems = flashData.filter((item) => {
    // Count how many times each emotion is required in the item
    const requiredEmotions = [item.Item1, item.Item2, item.Item3];
    const emotionCountsRequired = {};

    // Count the occurrences of each emotion in Item1, Item2, and Item3
    requiredEmotions.forEach((emotion) => {
      emotionCountsRequired[emotion] = (emotionCountsRequired[emotion] || 0) + 1;
    });

    // Check if the user has enough of each required emotion
    return Object.keys(emotionCountsRequired).every((emotion) => {
      return emotionCounts[emotion] >= emotionCountsRequired[emotion];
    });
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Instilling Combinations</h1>

      {/* Display the number of filtered items found */}
      <p>{filteredItems.length} items found</p>

      {/* Emotion Input Fields with Images and Arrows */}
      <div className="emotion-inputs">
        {emotions.map((emotion) => (
          <EmotionInput
            key={emotion}
            emotion={emotion}
            value={emotionCounts[emotion]}
            onIncrease={() => handleIncrease(emotion)}
            onDecrease={() => handleDecrease(emotion)}
            imageSrc={emotionImages[emotion]} // Replace with actual image path
          />
        ))}
      </div>

      {/* Container for the Flash Cards in a Grid */}
      <div className="flash-card-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <FlashCard key={index} flashData={item} />
          ))
        ) : (
          <div>No items match the requirements.</div>
        )}
      </div>
    </div>
  );
}

export default App;
