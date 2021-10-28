import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

// format number as currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const OrderDetails = createContext();

// Create custom hook to check wether we're inside de provider

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be use within an OrderDetailsProvider');
  }

  return context;
};

const calculateSubtotal = (optionType: string, optionCounts: any) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType]) {
    optionCount += count[1];
  }

  return optionCount * (pricePerItem as any)[optionType];
};

export const OrderDetailsProvider = (props: any) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  } as any);
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  });

  useEffect(() => {
    const scooptSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scooptSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scooptSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal)
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName: string, newItemCount: string, optionType: string) => {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };

    // getter: object containing option counts for scoops and topping, subtotal
    // setter: update option count
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
