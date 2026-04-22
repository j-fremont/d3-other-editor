import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MySchema from '../components/MySchema'

const MyContainer = () => {

  return (
    <Container fluid={true}>
      <Row>
        <Col>
        </Col>
        <Col>
        </Col>
      </Row>
      <Row id="editor">
        <MySchema />
      </Row>
    </Container>
  );
}

export default MyContainer;

