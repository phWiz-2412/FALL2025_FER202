import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState("");

  useEffect(() => {
    const e = {};
    if (!name.trim()) e.name = "Name không được để trống";
    if (!email) e.email = "Email không được để trống";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Email không hợp lệ";
    const ageNum = Number(age);
    if (!age) e.age = "Age không được để trống";
    else if (!Number.isInteger(ageNum) || ageNum < 18 || ageNum > 55)
      e.age = "Age phải trong khoảng 18-55";
    setErrors(e);
    setIsValid(Object.keys(e).length === 0);
  }, [name, email, age]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) setSubmittedMsg("Đăng ký thành công!");
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setAge("");
    setErrors({});
    setSubmittedMsg("");
  };

  return (
    <div className="form-container">
      <h4 className="form-title">Profile Form</h4>
      {submittedMsg && <Alert variant="success">{submittedMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
            placeholder="Enter your name"
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            placeholder="Enter your email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            isInvalid={!!errors.age}
            placeholder="Enter your age"
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" disabled={!isValid} variant="primary">
            Submit
          </Button>
          <Button variant="secondary" type="button" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProfileForm;
