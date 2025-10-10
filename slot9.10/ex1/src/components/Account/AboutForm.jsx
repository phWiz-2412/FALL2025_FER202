import React from "react";
import { Form } from "react-bootstrap";

export default function AboutForm() {
  return (
    <Form>
      <h5>
        <i className="bi bi-person-circle me-2"></i>About
      </h5>

      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" isInvalid />
        <Form.Control.Feedback type="invalid">
          Required field.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="tel" placeholder="Enter phone number" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="Enter age" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
    </Form>
  );
}
