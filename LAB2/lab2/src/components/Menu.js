import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: "$20.00",
    oldPrice: "$40.00",
    img: "/images/margherita.jpg",
    badge: "SALE",
  },
  {
    id: 2,
    name: "Mushroom Pizza",
    price: "$25.00",
    img: "/images/mushroom.jpg",
  },
  {
    id: 3,
    name: "Hawaiian Pizza",
    price: "$30.00",
    img: "/images/hawaiian.jpg",
    badge: "NEW",
  },
  {
    id: 4,
    name: "Pesto Pizza",
    price: "$30.00",
    oldPrice: "$50.00",
    img: "/images/pesto.jpg",
    badge: "SALE",
  },
];

function Menu() {
  return (
    <Container className="menu-section" id="menu">
      <h2 className="text-center mb-4">Our Menu</h2>
      <Row>
        {menuItems.map((item) => (
          <Col md={3} sm={6} key={item.id} className="mb-4">
            <Card className="menu-card">
              <div className="img-wrapper">
                <Card.Img variant="top" src={item.img} />
                {item.badge && <span className={`badge ${item.badge.toLowerCase()}`}>{item.badge}</span>}
              </div>
              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                {item.oldPrice ? (
                  <p>
                    <span className="text-muted text-decoration-line-through">{item.oldPrice}</span>{" "}
                    <span className="text-danger">{item.price}</span>
                  </p>
                ) : (
                  <p>{item.price}</p>
                )}
                <Button variant="dark" className="btn-lg w-100">
                    BUY
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Menu;
