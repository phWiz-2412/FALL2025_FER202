import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PaymentContext } from "../contexts/PaymentContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: paymentDispatch } = useContext(PaymentContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Xóa user
    authDispatch({ type: "LOGOUT" });
    // ✅ Reset danh sách payment
    paymentDispatch({ type: "SET_PAYMENTS", payload: [] });
    // ✅ Chuyển về trang login
    navigate("/login");
  };

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand className="fw-bold">TuitionTracker</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
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
