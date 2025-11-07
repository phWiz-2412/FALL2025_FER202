import { useContext, useEffect, useState } from "react";
import API from "../services/api";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import { AuthContext } from "../contexts/AuthContext";
import { Table, Container } from "react-bootstrap";

export default function HomePage() {
  const { state } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!state.user) return; // ✅ tránh lỗi khi user = null
      const res = await API.get("/payments");
      const userPayments = res.data.filter(p => p.userId === state.user.id);
      setPayments(userPayments);
      setFiltered(userPayments);
    };
    fetchPayments();
  }, [state.user]);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <FilterBar payments={payments} setFiltered={setFiltered} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Semester</th>
              <th>Course Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.semester}</td>
                <td>{p.courseName}</td>
                <td>{p.amount.toLocaleString()}</td>
                <td>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
