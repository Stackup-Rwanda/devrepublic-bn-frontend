import React from 'react';
import {
  Row, Col, Container,
} from 'react-bootstrap';
import '../../scss/footer.scss';

const Footer = () => (
  <Container className="fixed-bottom footer" fluid>
    <Row className="justify-content-md-center">
      <Col md="auto" className="footer_text">
        Copyright &copy; 2020 devrepublic team. All rights reserved.
      </Col>
    </Row>
  </Container>
);

export default Footer;
