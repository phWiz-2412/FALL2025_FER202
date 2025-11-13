import { Form, Row, Col } from "react-bootstrap";

export default function FilterBar({ categories, onFilter, onClear }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "all") onClear();
    else onFilter(value);
  };

  return (
    <Form>
      <Row className="g-2 align-items-center">
        <Col xs={12} md={4}>
          <Form.Label className="fw-semibold mb-1">Filter</Form.Label>
          <Form.Select onChange={handleChange}>
            <option value="all">All categories</option>
            {categories.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
}
