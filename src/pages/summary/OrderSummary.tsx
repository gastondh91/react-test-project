import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetaiils';
import { SummaryForm } from './SummaryForm';

const OrderSummary = ({ setOrderPhase }: any): JSX.Element => {
  const [orderDetails] = useOrderDetails() as any;

  const scoopArray: any = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]: any) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Array.from(orderDetails.toppings.keys());
  const toppingList = toppingsArray.map((key: any) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
