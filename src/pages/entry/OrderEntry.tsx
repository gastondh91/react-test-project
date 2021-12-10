import { useOrderDetails } from '../../contexts/OrderDetaiils';
import Options from './Options';
import { Button } from 'react-bootstrap';

const OrderEntry = ({ setOrderPhase }: any): JSX.Element => {
  const [orderDetails] = useOrderDetails() as any;

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase('review')}>Order Sundae!</Button>
    </div>
  );
};

export default OrderEntry;
