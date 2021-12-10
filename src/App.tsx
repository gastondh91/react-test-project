import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import './App.css';
import { OrderDetailsProvider } from './contexts/OrderDetaiils';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import { OrderConfirmation } from './pages/confirmation/OrderConfirmation';

const App = (): JSX.Element => {
  // orderPhase need to be 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
};

export default App;
