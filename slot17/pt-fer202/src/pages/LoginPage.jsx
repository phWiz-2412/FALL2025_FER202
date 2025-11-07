import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { PaymentContext } from "../contexts/PaymentContext";
import ConfirmModal from "../components/ConfirmModal";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: paymentDispatch } = useContext(PaymentContext);

  // ✅ Validate input
  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username or Email is required.";
    } else if (
      username.includes("@") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)
    ) {
      newErrors.username = "Email format is invalid.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  // ✅ Xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await API.get("/users");
      const user = res.data.find(
        (u) =>
          (u.username === username || u.email === username) &&
          u.password === password
      );

      if (!user) {
        setErrors({ general: "Invalid username/email or password!" });
        return;
      }

      // ✅ Lưu thông tin user vào AuthContext
      authDispatch({ type: "LOGIN", payload: user });

      // ✅ Nạp payment theo user vào PaymentContext
      const paymentRes = await API.get(`/payments?userId=${user.id}`);
      paymentDispatch({ type: "SET_PAYMENTS", payload: paymentRes.data });

      // ✅ Hiển thị modal chào mừng
      setMessage(`Welcome, ${user.username}! Login successful.`);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setErrors({});
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "420px" }}>
      <h4 className="text-center mb-4">Login</h4>

      {/* ⚠️ Alert báo lỗi đăng nhập */}
      {errors.general && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setErrors({ ...errors, general: "" })}
        >
          {errors.general}
        </Alert>
      )}

      <Form onSubmit={handleLogin} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Username or email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              type="button"
              className="w-100"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>

      {/* ✅ Modal xác nhận đăng nhập thành công */}
      <ConfirmModal show={showModal} message={message} />
    </Container>
  );
}
