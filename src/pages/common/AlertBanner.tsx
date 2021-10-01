import { Alert } from 'react-bootstrap';

const AlertBanner = ({ message, variant }: IAlertVariant): JSX.Element => {
  const alertMessage = message || 'An unexpected error occurred. Please try again later.';
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
};

interface IAlertVariant {
  message?: string;
  variant?: string;
}

export default AlertBanner;
