// src/components/Exercise4_SignUpForm.jsx
import React, { useReducer } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
const initialState = {
  username: "",
  email: "",
  password: "",
  confirm: "",
  errors: {},
  success: false,
};
function validateFields(state) {
  const errors = {};
  const uname = state.username;
  if (!uname || uname.trim().length < 3) errors.username = "Username phải >= 3 ký tự";
  else if (!/^[A-Za-z0-9_.]+$/.test(uname)) errors.username = "Chỉ chứa chữ, số, _ hoặc .";
  else if (uname !== uname.trim()) errors.username = "Không có khoảng trắng đầu/cuối";
  if (!state.email) errors.email = "Email không được để trống";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.email = "Email không hợp lệ";

  const pw = state.password;
  if (!pw) errors.password = "Password không được để trống";
  else {
    if (pw.length < 8) errors.password = "Password >= 8 ký tự";
    if (!/[A-Z]/.test(pw)) errors.password = "Password cần ít nhất 1 chữ hoa";
    if (!/[a-z]/.test(pw)) errors.password = "Password cần ít nhất 1 chữ thường";
    if (!/[0-9]/.test(pw)) errors.password = "Password cần ít nhất 1 chữ số";
    if (!/[^A-Za-z0-9]/.test(pw)) errors.password = "Password cần ít nhất 1 ký tự đặc biệt";
  }

  if (state.confirm !== pw) errors.confirm = "Confirm phải khớp password";
  return errors;
}
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, success: false };
    case "VALIDATE": {
      const errors = validateFields(state);
      return { ...state, errors, success: Object.keys(errors).length === 0 };
    }
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}
export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "VALIDATE" });
  };
  return (
    <Card className="p-4" style={{ width: "520px", margin: "40px auto" }}>
      <h4 className="text-center mb-3" style={{ color: "#1976d2" }}>Exercise 4 - Sign Up</h4>

      {state.success && <Alert variant="success">Đăng ký thành công!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={state.username}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "username", value: e.target.value })}
            isInvalid={!!state.errors.username}
            placeholder="Nhập username..."
          />
          <Form.Control.Feedback type="invalid">{state.errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={state.email}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
            isInvalid={!!state.errors.email}
            placeholder="Nhập email..."
          />
          <Form.Control.Feedback type="invalid">{state.errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
            isInvalid={!!state.errors.password}
            placeholder="Nhập password..."
          />
          <Form.Control.Feedback type="invalid">{state.errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={state.confirm}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "confirm", value: e.target.value })}
            isInvalid={!!state.errors.confirm}
            placeholder="Xác nhận password..."
          />
          <Form.Control.Feedback type="invalid">{state.errors.confirm}</Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex gap-2">
          <Button type="submit" variant="primary" className="flex-fill">Submit</Button>
          <Button variant="secondary" onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
        </div>
      </Form>
    </Card>
  );
}
