import { Col, Form, FormCheck, Row } from 'react-bootstrap';
import { IOptions } from './Options';

const ToppingOption = ({ name, imagePath, updateItemCount }: IOptions): JSX.Element => {
  return (
    <Col xs={4} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <FormCheck onChange={(event) => updateItemCount(name, event.target.checked ? 1 : 0)} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
