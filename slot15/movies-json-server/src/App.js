import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MovieProvider } from "./contexts/MovieContext";
import LoginForm from "./components/LoginForm";
import MovieManager from "./pages/MovieManager";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function AppContent() {
  const { user } = useAuth();
  return <>{user ? <MovieManager /> : <LoginForm />}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Container fluid className="app-container">
          <AppContent />
        </Container>
      </MovieProvider>
    </AuthProvider>
  );
}
