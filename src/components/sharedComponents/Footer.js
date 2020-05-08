import React from 'react';
import {
  Row, Col, Container,
} from 'react-bootstrap';
import '../../scss/footer.scss';
import translate from '../languages/Translate';

const Footer = () => (
  <Container className="fixed-bottom footer" fluid>
    <Row className="justify-content-md-center">
      <Col md="auto" className="footer_text">
        { translate('Copyright 2020 devrepublic team. All rights reserved.')}
      </Col>
    </Row>
  </Container>
);

export default Footer;
