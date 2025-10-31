import React, { useReducer } from "react";
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import ConfirmModal from "./ConfirmModal";

const initialFormState = {
  identifier: "",
  password: "",
  errors: {},
  showSuccessModal: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.field]: action.message } };
    case "CLEAR_ERROR":
      const { [action.field]: removed, ...rest } = state.errors;
      return { ...state, errors: rest };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SHOW_SUCCESS_MODAL":
      return { ...state, showSuccessModal: true };
    case "HIDE_SUCCESS_MODAL":
      return { ...state, showSuccessModal: false };
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { login, loading, error, clearError, user } = useAuth();

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes("@");

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
    clearError();

    if (name === "identifier") {
      if (!value.trim()) dispatch({ type: "SET_ERROR", field: name, message: "Username or Email required" });
      else if (isEmail(value) && !emailRe.test(value)) dispatch({ type: "SET_ERROR", field: name, message: "Invalid email format" });
      else dispatch({ type: "CLEAR_ERROR", field: name });
    }

    if (name === "password") {
      if (!value.trim()) dispatch({ type: "SET_ERROR", field: name, message: "Password required" });
      else dispatch({ type: "CLEAR_ERROR", field: name });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formState.identifier.trim()) errors.identifier = "Username or Email required";
    if (!formState.password.trim()) errors.password = "Password required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const validationErrors = validateForm();
    dispatch({ type: "SET_ERRORS", errors: validationErrors });
    if (Object.keys(validationErrors).length > 0) return;

    const result = await login(formState.identifier.trim(), formState.password);
    if (result.ok) dispatch({ type: "SHOW_SUCCESS_MODAL" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
    clearError();
  };

  const handleCloseModal = () => {
    dispatch({ type: "HIDE_SUCCESS_MODAL" });
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center">Login with AuthContext</Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible onClose={clearError}>
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    name="identifier"
                    value={formState.identifier}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                  />
                  <Form.Control.Feedback type="invalid">{formState.errors.identifier}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{formState.errors.password}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" disabled={loading} className="flex-fill">
                    {loading ? <Spinner size="sm" animation="border" /> : "Login"}
                  </Button>
                  <Button variant="secondary" type="button" onClick={handleReset} className="flex-fill">
                    Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful"
        message={`Welcome, ${user?.username}! You are logged in as ${user?.role}.`}
        onConfirm={handleCloseModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
}

export default LoginForm;
