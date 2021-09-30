import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';

const Options = ({ optionType }: { optionType: string }): JSX.Element => {
  const [items, setItems] = useState<IScoops[]>([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    const getToppings = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        console.log({ error });
      }
    };
    getToppings();
  }, [optionType]);
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  const optionItems = items.map((item: IScoops) =>
    ItemComponent ? (
      <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ) : null
  );

  return <Row>{optionItems}</Row>;
};

interface IScoops {
  name: string;
  imagePath: string;
}

export default Options;
