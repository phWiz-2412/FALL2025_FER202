import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function AddExpense({
  onAdd,
  editing,
  onUpdate,
  onCancel,
  categories,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setName(editing.name || "");
      setAmount(editing.amount || "");
      setCategory(editing.category || "");
      setDate(editing.date || "");
      setErrors({});
    } else {
      setName("");
      setAmount("");
      setCategory("");
      setDate("");
      setErrors({});
    }
  }, [editing]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!category.trim()) e.category = "Category is required";
    const amt = Number(amount);
    if (!amount || isNaN(amt) || amt <= 0) e.amount = "Amount must be > 0";
    if (!date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = {
      name,
      amount: Number(amount),
      category,
      date,
    };

    if (editing) onUpdate(editing.id, payload);
    else onAdd(payload);
  };

  return (
    <Form onSubmit={handleSubmit}>

      {/* Name */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Amount */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          isInvalid={!!errors.amount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.amount}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Category */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Category</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          isInvalid={!!errors.category}
        >
          <option value="">Select category</option>
          {categories.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.category}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Date */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          isInvalid={!!errors.date}
        />
        <Form.Control.Feedback type="invalid">
          {errors.date}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Buttons */}
      <Row>
        <Col>
          {editing ? (
            <Button type="submit" className="w-100 btn-success">
              Save
            </Button>
          ) : (
            <Button type="submit" className="w-100 btn-primary">
              Add expense
            </Button>
          )}
        </Col>

        <Col>
          {editing ? (
            <Button
              type="button"
              className="w-100 btn-secondary"
              onClick={onCancel}
            >
              Reset
            </Button>
          ) : (
            <Button
              type="button"
              className="w-100 btn-secondary"
              onClick={() => {
                setName("");
                setAmount("");
                setCategory("");
                setDate("");
              }}
            >
              Reset
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}
