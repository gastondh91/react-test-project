import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetaiils';

const renderWithContext = (ui: any, options?: any) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from '@testing-library/react';

export { renderWithContext as render };
