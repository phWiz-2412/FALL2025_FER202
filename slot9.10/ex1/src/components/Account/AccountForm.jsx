import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";

export default function AccountForm() {
  return (
    <Form>
      <h5>
        <i className="bi bi-lock me-2"></i>Account
      </h5>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaUser />
          </InputGroup.Text>
          <Form.Control type="text" placeholder="Enter username" />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaLock />
          </InputGroup.Text>
          <Form.Control type="password" placeholder="Enter password" />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaLock />
          </InputGroup.Text>
          <Form.Control type="password" placeholder="Confirm password" />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Control type="text" placeholder="Your secret question" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control type="text" placeholder="Your answer" />
      </Form.Group>
    </Form>
  );
}
