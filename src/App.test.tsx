import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('Action button has initial color of blue', () => {
  render(<App />);
  const switchButton = screen.getByRole('button', { name: 'Switch color' });
  const h3 = screen.getByRole('heading', { name: 'Selected color is blue' });
  expect(switchButton).toHaveClass('action-button-blue');
  expect(h3).toBeInTheDocument();
  fireEvent.click(switchButton);
  expect(switchButton).toHaveClass('action-button-red');
  fireEvent.click(switchButton);
  expect(switchButton).toHaveClass('action-button-blue');
});
