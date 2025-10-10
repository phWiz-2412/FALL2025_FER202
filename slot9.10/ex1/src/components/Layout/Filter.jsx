import React, { useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";

export default function Filter({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState("none");

  const handleChange = () => {
    onFilterChange({ search, year, sort });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h5 className="mb-3">🎞️ Filter & Sort</h5>
        <Row className="g-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search movie..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleChange();
              }}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                handleChange();
              }}
            >
              <option value="all">All Years</option>
              <option value="<=2000">≤ 2000</option>
              <option value="2001-2015">2001–2015</option>
              <option value=">2015">&gt; 2015</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                handleChange();
              }}
            >
              <option value="none">No Sort</option>
              <option value="yearAsc">Year ↑</option>
              <option value="yearDesc">Year ↓</option>
              <option value="titleAsc">Title A→Z</option>
              <option value="titleDesc">Title Z→A</option>
              <option value="durationAsc">Duration ↑</option>
              <option value="durationDesc">Duration ↓</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
