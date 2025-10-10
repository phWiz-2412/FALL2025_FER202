import React from "react";
import { Form } from "react-bootstrap";

export default function AddressForm() {
  return (
    <Form>
      <h5>
        <i className="bi bi-geo-alt me-2"></i>Address
      </h5>

      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control type="text" placeholder="Enter street" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="Enter city" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select>
          <option>Vietnam</option>
          <option>USA</option>
          <option>Japan</option>
          <option>UK</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="text" placeholder="Enter zip code" />
      </Form.Group>
    </Form>
  );
}
