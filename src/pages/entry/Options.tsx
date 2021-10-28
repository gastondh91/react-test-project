import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetaiils';
import AlertBanner from '../common/AlertBanner';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }: { optionType: string }): JSX.Element => {
  const [items, setItems] = useState<IOptions[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [orderDetails, updateItemCount] = useOrderDetails() as any;

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
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

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
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={(itemName, newItemCount) =>
          updateItemCount(itemName, newItemCount, optionType)
        }
      />
    ) : null
  );

  return (
    <>
      <h2>{title}</h2>
      <p>{(pricePerItem as any)[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export interface IOptions {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string, optionType?: string) => void;
}

export default Options;
