import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function ContactPage() {
  return (
    <Container className="mt-4 mb-5">
      <h3>📬 Contact Us</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Your message..." />
        </Form.Group>

        <Button variant="primary">Send Message</Button>
      </Form>
    </Container>
  );
}
