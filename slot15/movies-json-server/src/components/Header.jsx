import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand>🎬 Movie Manager</Navbar.Brand>
        {user && (
          <div className="text-white">
            Xin chào, <strong>{user.name}</strong>{" "}
            <Button size="sm" variant="outline-light" onClick={logout}>
              Đăng xuất
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}
