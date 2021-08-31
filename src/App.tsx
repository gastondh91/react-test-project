import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [buttonClass, setButtonClass] = useState('action-button-red');

  const newButtonColor =
    buttonClass === 'action-button-red' ? 'action-button-blue' : 'action-button-red';
  const selectedColor = buttonClass === 'action-button-red' ? 'blue' : 'red';

  return (
    <div className="App">
      <h3>Selected color is {selectedColor}</h3>
      <button onClick={() => setButtonClass(newButtonColor)} className={newButtonColor}>
        Switch color
      </button>
    </div>
  );
};

export default App;
