import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function Booking() {
  return (
    <div className="booking-section" id="booking">
      <Container>
        <h2 className="text-center mb-4">Book Your Table</h2>
        <Form>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Control type="text" placeholder="Your Name *" required />
            </Col>
            <Col md={3}>
              <Form.Control type="email" placeholder="Your Email *" required />
            </Col>
            <Col md={3}>
              <Form.Select>
                <option>Select a Service</option>
                <option>Dine In</option>
                <option>Take Away</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Button variant="warning" type="submit" className="w-100">
                Send Message
              </Button>
            </Col>
          </Row>
          <Form.Control as="textarea" rows={2} placeholder="Please write your comment" />
        </Form>
      </Container>
    </div>
  );
}

export default Booking;
