import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function FilterBar({ payments, setFiltered }) {
  const [keyword, setKeyword] = useState("");
  const [sortType, setSortType] = useState("");

  const handleSearch = () => {
    let list = payments.filter(
      p =>
        p.semester.toLowerCase().includes(keyword.toLowerCase()) ||
        p.courseName.toLowerCase().includes(keyword.toLowerCase())
    );
    switch (sortType) {
      case "az":
        list.sort((a, b) => a.courseName.localeCompare(b.courseName));
        break;
      case "za":
        list.sort((a, b) => b.courseName.localeCompare(a.courseName));
        break;
      case "dateAsc":
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "dateDesc":
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "amountAsc":
        list.sort((a, b) => a.amount - b.amount);
        break;
      case "amountDesc":
        list.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }
    setFiltered(list);
  };

  return (
    <Row className="mb-3">
      <Col sm={5}>
        <Form.Control
          placeholder="Search by semester or course name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Col>
      <Col sm={4}>
        <Form.Select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort by...</option>
          <option value="az">Course A → Z</option>
          <option value="za">Course Z → A</option>
          <option value="dateAsc">Date ↑</option>
          <option value="dateDesc">Date ↓</option>
          <option value="amountAsc">Amount ↑</option>
          <option value="amountDesc">Amount ↓</option>
        </Form.Select>
      </Col>
      <Col sm={3}>
        <Button onClick={handleSearch}>Apply</Button>
      </Col>
    </Row>
  );
}
