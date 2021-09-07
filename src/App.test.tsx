import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('Button', () => {
  // Initial color selected is blue

  render(<App />);
  const switchButton = screen.getByRole('button', { name: 'Switch color' });
  const h3 = screen.getByRole('heading', { name: 'Selected color is Midnight Blue' });
  expect(switchButton).toHaveClass('midnight-blue');
  expect(h3).toBeInTheDocument();

  // After click color turns to red and with another click it turns to blue

  fireEvent.click(switchButton);
  expect(switchButton).toHaveClass('medium-violet-red');
  expect(h3).toHaveTextContent('Selected color is Medium Violet Red');

  fireEvent.click(switchButton);
  expect(switchButton).toHaveClass('midnight-blue');
});

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />);

  const switchButton = screen.getByRole('button', { name: 'Switch color' });
  expect(switchButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(switchButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(switchButton).toBeEnabled();
});

test('Disabled button has gray backgruound and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const switchButton = screen.getByRole('button', { name: 'Switch color' });

  fireEvent.click(checkbox);
  expect(switchButton).toHaveClass('disabled-gray');
  fireEvent.click(checkbox);
  expect(switchButton).toHaveClass('midnight-blue');
});

test('Disabled button has gray backgruound and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const switchButton = screen.getByRole('button', { name: 'Switch color' });

  fireEvent.click(switchButton);

  fireEvent.click(checkbox);
  expect(switchButton).toHaveClass('disabled-gray');

  fireEvent.click(checkbox);
  expect(switchButton).toHaveClass('medium-violet-red');
});

describe('spaces before camel-case capital letters', () => {
  test('Words for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
