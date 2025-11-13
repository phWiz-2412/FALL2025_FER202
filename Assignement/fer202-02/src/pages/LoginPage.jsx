import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(s => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) navigate("/home");
  }, [auth.user, navigate]);

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Username is required.";
    if (!password.trim()) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      const res = await dispatch(loginUser({ username, password })).unwrap();
      setShowModal(true);
      setTimeout(()=> {
        setShowModal(false);
        navigate("/home");
      }, 1200);
    } catch (err) {
      setErrors({ general: "Invalid username or password." });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 420 }}>
      <h4 className="text-center mb-4">Login</h4>

      {errors.general && <Alert variant="danger">{errors.general}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={e=>setUsername(e.target.value)} isInvalid={!!errors.username} />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} isInvalid={!!errors.password} />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            <Form.Label>(at least 6 characters)</Form.Label>
        </Form.Group>

        <Row>
          <Col><Button type="submit" className="w-100">Login</Button></Col>
        </Row>
      </Form>

      <ConfirmModal show={showModal} message="Login successful!" />
    </Container>
  );
}
