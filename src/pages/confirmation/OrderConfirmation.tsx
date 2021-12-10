import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetaiils';

export const OrderConfirmation = ({ setOrderPhase }: any): JSX.Element => {
  const [, , resetOrder] = useOrderDetails() as any;
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = () => {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase('inProgress');
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};
