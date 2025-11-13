import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { clearExpenses } from "../store/expensesSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearExpenses());
    navigate("/login");
  };

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand className="fw-bold">
          <img src="/logo192.png" alt="logo" width="28" className="me-2" />
          PersonalBudget
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {user && (
            <>
              <span className="me-3">Signed in as <b>{user.fullName}</b></span>
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
