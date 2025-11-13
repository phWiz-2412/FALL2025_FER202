import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import PaymentsPage from "./pages/PaymentsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container mt-3">
        <h2>Lab 6 – Redux Toolkit</h2>
        <nav className="mb-3">
          <Link to="/users" className="btn btn-primary me-2">Users</Link>
          <Link to="/payments" className="btn btn-success">Payments</Link>
        </nav>

        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
