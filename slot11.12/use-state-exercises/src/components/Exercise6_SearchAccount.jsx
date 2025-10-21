import React, { useState } from "react";
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormStyle.css";

function SearchAccount() {
  // Danh sách tài khoản mẫu
  const accounts = [
    {
      id: 1,
      username: "traltb",
      password: "123@Tra",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      username: "quocphd",
      password: "Pass@456",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      username: "minhhoa",
      password: "Hoa@789",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      username: "anhkhoa",
      password: "Khoa@123",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 5,
      username: "wizz",
      password: "Wizz@2412",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 6,
      username: "ngocngu",
      password: "Ngoc@123",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Lọc kết quả theo username
  const filteredAccounts = accounts.filter((acc) =>
    acc.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container style={{ maxWidth: "900px", marginTop: "50px" }}>
      <div className="form-container">
        <h3 className="form-title">Exercise 6 - Search Account</h3>

        {/* Ô tìm kiếm */}
        <Form.Group className="mb-4">
          <Form.Label className="form-label">Tìm kiếm theo Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập username cần tìm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>

        {/* Hiển thị kết quả */}
        {filteredAccounts.length > 0 ? (
          <Row xs={1} sm={2} md={3} className="g-3">
            {filteredAccounts.map((acc) => (
              <Col key={acc.id}>
                <Card
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={acc.avatar}
                    alt={acc.username}
                    style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: "#1976d2" }}>{acc.username}</Card.Title>
                    <Card.Text>
                      <strong>Password:</strong> {acc.password}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#d32f2f",
              marginTop: "20px",
              fontWeight: "500",
            }}
          >
            Không tìm thấy kết quả
          </p>
        )}
      </div>
    </Container>
  );
}

export default SearchAccount;
