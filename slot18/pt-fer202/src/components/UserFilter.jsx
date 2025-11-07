import { useContext, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

export default function UserFilter() {
  const { state, dispatch } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");
  const [sortType, setSortType] = useState("");

  const handleFilter = () => {
    let list = state.users.filter(
      (u) =>
        u.username.toLowerCase().includes(keyword.toLowerCase()) ||
        u.fullName.toLowerCase().includes(keyword.toLowerCase())
    );

    if (sortType === "az") list.sort((a, b) => a.username.localeCompare(b.username));
    if (sortType === "za") list.sort((a, b) => b.username.localeCompare(a.username));

    dispatch({ type: "SET_USERS", payload: list });
  };

  return (
    <Row className="mb-3">
      <Col sm={5}>
        <Form.Control
          placeholder="Search by username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Col>
      <Col sm={4}>
        <Form.Select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort by...</option>
          <option value="az">Username A→Z</option>
          <option value="za">Username Z→A</option>
        </Form.Select>
      </Col>
      <Col sm={3}>
        <Button onClick={handleFilter}>Apply</Button>
      </Col>
    </Row>
  );
}
