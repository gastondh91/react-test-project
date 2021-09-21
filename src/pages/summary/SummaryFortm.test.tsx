import React from 'react';
import { render, screen } from '@testing-library/react';
import { SummaryForm } from './SummaryForm';
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/dom';

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

    userEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });
});

describe('Popover transitions', () => {
  test('Popover starts out hidden', () => {
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);

    expect(nullPopover).not.toBeInTheDocument();
  });

  test('Popover appears upon mouseover of checkbox label and dissapears when we mouse out', async () => {
    render(<SummaryForm />);

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.getByText(/no ice cream will actually be delivered/i)
    );
  });
});
