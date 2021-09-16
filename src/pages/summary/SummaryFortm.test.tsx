import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SummaryForm } from './SummaryForm';

describe('Initial conditions', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i });
  test('expect checkbox to be unchecked and enabled', () => {
    expect(checkbox).toBeEnabled();
    expect(checkbox).not.toBeChecked();
  });

  test('expect confirm order button to be disabled', () => {
    render(<SummaryForm />);
    const confirmButton = screen.getByRole('button', { name: /Confirm order/i });
    expect(confirmButton).toBeDisabled();
  });
});

describe('Checkbox and button transitions', () => {
  test('Checkbox disables button on first click and enables on second click', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm order/i });

    fireEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();

    fireEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });
});
