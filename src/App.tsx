import React, { useState } from 'react';
import './App.css';

export const replaceCamelWithSpaces = (colorName: string): string => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
};

const App = (): JSX.Element => {
  const [buttonClass, setButtonClass] = useState('medium-violet-red');
  const [disabledButton, setDisabledButton] = useState(false);

  const newButtonColor =
    buttonClass === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';
  const selectedColor = buttonClass === 'medium-violet-red' ? 'Midnight Blue' : 'Medium Violet Red';

  return (
    <div className="App">
      <h3>Selected color is {replaceCamelWithSpaces(selectedColor)}</h3>
      <button
        aria-checked={disabledButton}
        disabled={disabledButton}
        onClick={() => setButtonClass(newButtonColor)}
        className={disabledButton ? 'disabled-gray' : newButtonColor}
      >
        Switch color
      </button>
      <hr />
      <label htmlFor="disable-button-checkbox">Disable button</label>
      <input
        id="disable-button-checkbox"
        onChange={(e) => setDisabledButton(e.target.checked)}
        type="checkbox"
      />
    </div>
  );
};

export default App;
