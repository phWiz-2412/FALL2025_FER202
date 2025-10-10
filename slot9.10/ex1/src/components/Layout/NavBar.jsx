import React from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Container,
  Dropdown,
} from "react-bootstrap";
import { FaUser, FaHeart, FaSignInAlt, FaSearch } from "react-icons/fa";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container fluid>
        <Navbar.Brand href="/">🎬 Movie Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>

          <Form className="d-flex me-3">
            <Form.Control type="search" placeholder="Quick search..." />
            <Button variant="outline-primary" className="ms-2">
              <FaSearch />
            </Button>
          </Form>

          <Dropdown align="end" className="me-2">
            <Dropdown.Toggle variant="outline-secondary">
              <FaUser /> Accounts
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/account">Manage Your Profiles</Dropdown.Item>
              <Dropdown.Item href="/account">Build your Account</Dropdown.Item>
              <Dropdown.Item href="#">Change Password</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button variant="outline-success" className="me-2">
            <FaHeart /> Favourites
          </Button>

          <Button variant="outline-dark">
            <FaSignInAlt /> Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
