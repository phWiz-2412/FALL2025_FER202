import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PaymentContext } from "../contexts/PaymentContext";
import { useNavigate, NavLink } from "react-router-dom";

export default function Header() {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: paymentDispatch } = useContext(PaymentContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    paymentDispatch({ type: "SET_PAYMENTS", payload: [] });
    navigate("/login");
  };

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        {/* 🟢 Bấm vào "TuitionTracker" sẽ về trang /home */}
        <Navbar.Brand as={NavLink} to="/home" className="fw-bold text-decoration-none">
          TuitionTracker
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <NavLink to="/users" className="nav-link me-3">
            User Management
          </NavLink>
          {authState.user && (
            <>
              <span className="me-3">
                Signed in as <b>{authState.user.fullName}</b>
              </span>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
