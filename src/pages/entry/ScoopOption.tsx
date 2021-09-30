import { Col } from 'react-bootstrap';

const ScoopOptions = ({ name, imagePath }: IScoopOptions): JSX.Element => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
};

export interface IScoopOptions {
  name: string;
  imagePath: string;
}

export default ScoopOptions;
