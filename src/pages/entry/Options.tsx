import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import AlertBanner from '../common/AlertBanner';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }: { optionType: string }): JSX.Element => {
  const [items, setItems] = useState<IOptions[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getToppings = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        setError(true);
      }
    };
    getToppings();
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  let ItemComponent: ({ name, imagePath }: IOptions) => JSX.Element;

  switch (optionType) {
    case 'scoops':
      ItemComponent = ScoopOption;
      break;
    case 'toppings':
      ItemComponent = ToppingOption;
      break;
    default:
      null;
  }

  const optionItems = items.map((item: IOptions) =>
    ItemComponent ? (
      <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ) : null
  );

  return <Row>{optionItems}</Row>;
};

export interface IOptions {
  name: string;
  imagePath: string;
}

export default Options;
