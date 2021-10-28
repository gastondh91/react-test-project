import Container from 'react-bootstrap/Container';
import './App.css';
import { OrderDetailsProvider } from './contexts/OrderDetaiils';
import OrderEntry from './pages/entry/OrderEntry';

const App = (): JSX.Element => {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
};

export default App;
