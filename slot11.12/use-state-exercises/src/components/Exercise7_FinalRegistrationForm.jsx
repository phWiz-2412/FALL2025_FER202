import React, { useState, useEffect } from "react";
import { Form, Button, Toast, Modal, Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormStyle.css";

function FinalRegistrationForm() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Validate user input
  useEffect(() => {
    const e = {};
    const uname = user.username.trim();
    if (!uname) e.username = "Username không được để trống";
    else if (uname.length < 3)
      e.username = "Username phải ≥ 3 ký tự";
    else if (!/^[A-Za-z0-9_.]+$/.test(uname))
      e.username = "Chỉ chứa chữ, số, _ hoặc .";
    else if (uname !== user.username)
      e.username = "Không có khoảng trắng đầu/cuối";

    if (!user.email)
      e.email = "Email không được để trống";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
      e.email = "Email không hợp lệ";

    const pw = user.password;
    if (!pw) e.password = "Password không được để trống";
    else if (pw.length < 8)
      e.password = "Password ≥ 8 ký tự";
    else if (!/[A-Z]/.test(pw))
      e.password = "Cần 1 chữ hoa";
    else if (!/[a-z]/.test(pw))
      e.password = "Cần 1 chữ thường";
    else if (!/[0-9]/.test(pw))
      e.password = "Cần 1 chữ số";
    else if (!/[^A-Za-z0-9]/.test(pw))
      e.password = "Cần 1 ký tự đặc biệt";

    if (user.confirm !== pw)
      e.confirm = "Confirm password phải khớp password";

    setErrors(e);
    setIsValid(Object.keys(e).length === 0);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setUser({ username: "", email: "", password: "", confirm: "" });
    setErrors({});
    setIsValid(false);
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "50px" }}>
      <div className="form-container">
        <h3 className="form-title">Exercise 7 - Final Registration Form</h3>

        <Form onSubmit={handleSubmit}>
          {["username", "email", "password", "confirm"].map((field) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label className="form-label">
                {field === "confirm"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </Form.Label>
              <Form.Control
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                value={user[field]}
                onChange={handleChange}
                isInvalid={!!errors[field]}
                placeholder={`Nhập ${field}...`}
              />
              <Form.Control.Feedback type="invalid">
                {errors[field]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}

          <div className="d-flex gap-2 mt-2">
            <Button type="submit" variant="primary" disabled={!isValid} style={{ flex: 1 }}>
              Submit
            </Button>
            <Button variant="secondary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>

      {/* ✅ Toast fixed: đặt position: fixed cho căn góc phải trên màn hình */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 2000,
        }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2500}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body>Submitted successfully!</Toast.Body>
        </Toast>
      </div>

      {/* Modal hiển thị thông tin */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Đăng Ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{user.username}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.email}
                <br />
                <strong>Password:</strong> {user.password}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer> 
      </Modal>
    </Container>
  );
}

export default FinalRegistrationForm;
