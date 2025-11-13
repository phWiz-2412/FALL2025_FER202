import { Table, Button } from "react-bootstrap";

function formatDateHyphen(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export default function ExpenseTable({ list, onEdit, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th style={{ width: 140 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.length === 0 && (
          <tr><td colSpan="5" className="text-center">No expenses</td></tr>
        )}
        {list.map(e => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.amount.toLocaleString("vi-VN")} ₫</td>
            <td>{e.category}</td>
            <td>{formatDateHyphen(e.date)}</td>
            <td>
              <Button size="sm" onClick={() => onEdit(e)} className="me-2">Edit</Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(e.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
