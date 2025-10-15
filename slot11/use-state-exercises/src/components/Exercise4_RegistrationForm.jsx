import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function RegistrationForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState("");

  useEffect(() => {
    const e = {};
    const uname = form.username.trim();
    if (!uname) e.username = "Username không được để trống";
    else if (uname.length < 3)
      e.username = "Username phải ≥ 3 ký tự";
    else if (!/^[A-Za-z0-9_.]+$/.test(uname))
      e.username = "Chỉ chứa chữ, số, _ hoặc .";
    else if (uname !== form.username)
      e.username = "Không có khoảng trắng đầu/cuối";

    if (!form.email) e.email = "Email không được để trống";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email không hợp lệ";

    const pw = form.password;
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

    if (form.confirm !== pw)
      e.confirm = "Confirm password phải khớp password";

    setErrors(e);
    setIsValid(Object.keys(e).length === 0);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) setSubmittedMsg("Đăng ký thành công!");
  };

  const handleCancel = () => {
    setForm({ username: "", email: "", password: "", confirm: "" });
    setErrors({});
    setSubmittedMsg("");
  };

  return (
    <div className="form-container">
      <h4 className="form-title">Form Đăng Ký</h4>
      {submittedMsg && <Alert variant="success">{submittedMsg}</Alert>}

      <Form onSubmit={handleSubmit}>
        {["username", "email", "password", "confirm"].map((field) => (
          <Form.Group key={field} className="mb-3">
            <Form.Label>
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
              value={form[field]}
              onChange={handleChange}
              isInvalid={!!errors[field]}
            />
            <Form.Control.Feedback type="invalid">
              {errors[field]}
            </Form.Control.Feedback>
          </Form.Group>
        ))}
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={!isValid}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegistrationForm;
