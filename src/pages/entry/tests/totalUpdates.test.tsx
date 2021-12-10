import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scooptSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scooptSubtotal).toHaveTextContent('Scoops total: $0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scooptSubtotal).toHaveTextContent('Scoops total: $2.00');

  //update chocolate scoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scooptSubtotal).toHaveTextContent('Scoops total: $6.00');
});

test('update toppings subtotal when toppings are added', async () => {
  render(<Options optionType="toppings" />);

  const toppingsTotals = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotals).toHaveTextContent('Toppings total: $0.00');

  const checkboxCherries = await screen.findByRole('checkbox', { name: 'Cherries' });
  const checkboxHotFudge = await screen.findByRole('checkbox', { name: 'Hot fudge' });

  // add cherries and check subtotal

  userEvent.click(checkboxCherries);
  expect(toppingsTotals).toHaveTextContent('Toppings total: $1.50');

  // add Hot Fudge and check subtotal

  userEvent.click(checkboxHotFudge);
  expect(toppingsTotals).toHaveTextContent('Toppings total: $3.00');

  // remover Hot Fudge and check subtotal

  userEvent.click(checkboxHotFudge);
  expect(toppingsTotals).toHaveTextContent('Toppings total: $1.50');
});

describe('grand total', () => {
  test('grand total updates propertly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { level: 2, name: /grand total: \$/i });

    // check that the grand total starts out at 0

    expect(grandTotal).toHaveTextContent('$0.00');

    // update vanilla scoops to 2 and check gran total

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check grand total

    const checkboxCherries = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(checkboxCherries);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates propertly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole('heading', { level: 2, name: /grand total: \$/i });

    const checkboxCherries = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(checkboxCherries);

    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('5.50');
  });
  // test('grand total updates propertly if an item is removed', () => {});
});
