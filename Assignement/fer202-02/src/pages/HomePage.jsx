import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import AddExpense from "../components/AddExpense";
import ExpenseTable from "../components/ExpenseTable";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../store/expensesSlice";

import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";

function totalAmount(list) {
  return list.reduce((s, e) => s + Number(e.amount || 0), 0);
}

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const expenses = useSelector((s) => s.expenses.list);

  const [filtered, setFiltered] = useState([]);
  const [editing, setEditing] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const categories = useMemo(() => {
    const setCat = new Set();
    expenses.forEach((e) => setCat.add(e.category));
    return Array.from(setCat);
  }, [expenses]);

  useEffect(() => {
    if (user) dispatch(fetchExpenses(user.id));
  }, [user, dispatch]);

  useEffect(() => {
    setFiltered(expenses);
  }, [expenses]);

  const handleFilter = (category) => {
    if (category === "all" || !category) {
      setFiltered(expenses);
      return;
    }
    setFiltered(expenses.filter((e) => e.category === category));
  };

  const handleClear = () => setFiltered(expenses);

  const handleAdd = async (payload) => {
    await dispatch(addExpense({ ...payload, userId: user.id }));
  };

  const handleEdit = (item) => setEditing(item);

  const handleUpdate = async (id, data) => {
    await dispatch(updateExpense({ id, data: { ...data, userId: user.id } }));
    setEditing(null);
  };

  const handleCancelEdit = () => setEditing(null);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteExpense(deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const total = useMemo(() => totalAmount(filtered), [filtered]);

  return (
    <>
      <Header />

      <Container className="mt-4">

        <Row className="mb-3">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-1">Total of Expenses</h5>
                <h3 className="fw-bold text-primary">
                  {total.toLocaleString("vi-VN")} ₫
                </h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <FilterBar
              categories={categories}
              onFilter={handleFilter}
              onClear={handleClear}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-3">
                  {editing ? "Edit Expense" : "Add Expense"}
                </h5>

                <AddExpense
                  editing={editing}
                  onAdd={handleAdd}
                  onUpdate={handleUpdate}
                  onCancel={handleCancelEdit}
                  categories={categories}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Expense Management</h5>

                <ExpenseTable
                  list={filtered}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Delete Modal */}
        <DeleteConfirmModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />

        <div className="text-center mt-4 text-muted">
          © 2025 PersonalBudget Demo — Built with React, Redux Toolkit & JSON Server
        </div>
      </Container>
    </>
  );
}
