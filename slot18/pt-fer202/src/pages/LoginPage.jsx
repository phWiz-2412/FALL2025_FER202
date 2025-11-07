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

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username or Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

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

      // 🧩 Kiểm tra role và status
      if (user.role == "user" |  user.status == "locked") {
        if (user.status == "active") {
          setErrors({
            general: "Tài khoản là USER, bạn không có quyền truy cập.",
          });
          } else {
            setErrors({  
              general: "Tài khoản của bạn đang bị khóa.",
            });
          }
        return;
      }


      authDispatch({ type: "LOGIN", payload: user });

      const payRes = await API.get(`/payments?userId=${user.id}`);
      paymentDispatch({ type: "SET_PAYMENTS", payload: payRes.data });

      setMessage(`Welcome, ${user.username}! Login successful.`);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "420px" }}>
      <h4 className="text-center mb-4">Login</h4>

      {errors.general && <Alert variant="danger">{errors.general}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username or Email</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Col>
          <Col>
            <Button
              type="button"
              variant="secondary"
              className="w-100"
              onClick={() => {
                setUsername("");
                setPassword("");
                setErrors({});
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>

      <ConfirmModal show={showModal} message={message} />
    </Container>
  );
}
