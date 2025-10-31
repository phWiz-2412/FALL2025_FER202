// src/components/Exercise3_LoginForm.jsx
import React, { useReducer } from "react";
import { Form, Button, Card } from "react-bootstrap";

const initialState = {
  username: "",
  password: "",
  error: "",
  isLoggedIn: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, error: "" };
    case "LOGIN":
      // demo: tài khoản đúng là admin / 123 ; thay theo yêu cầu nếu cần
      if (state.username === "admin" && state.password === "123") {
        return { ...state, isLoggedIn: true, error: "" };
      } else {
        return { ...state, error: "Sai tên đăng nhập hoặc mật khẩu!" };
      }
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
  };

  return (
    <Card className="p-4" style={{ width: "420px", margin: "40px auto" }}>
      <h4 className="text-center mb-3" style={{ color: "#1976d2" }}>Exercise 3 - Login Form</h4>

      {state.isLoggedIn ? (
        <div className="text-center">
          <h5>Xin chào, <span style={{ color: "#1976d2" }}>{state.username}</span>!</h5>
          <Button variant="danger" onClick={() => dispatch({ type: "LOGOUT" })}>
            Đăng xuất
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Nhập username..."
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "username", value: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập password..."
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })
              }
              required
            />
          </Form.Group>

          {state.error && <p style={{ color: "red" }}>{state.error}</p>}

          <Button type="submit" variant="primary" className="w-100">Đăng nhập</Button>
        </Form>
      )}
    </Card>
  );
}
