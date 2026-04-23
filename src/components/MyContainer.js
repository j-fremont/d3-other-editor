import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Day1 from '../components/Day1'
import MySchema from '../components/MySchema'
import MySchema2 from '../components/MySchema2'

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

