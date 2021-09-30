import Options from './Options';

const OrderEntry = (): JSX.Element => (
  <div>
    <Options optionType="scoops" />
    <Options optionType="toppings" />
  </div>
);

export default OrderEntry;
