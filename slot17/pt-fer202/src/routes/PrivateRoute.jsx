import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { state } = useContext(AuthContext);
  return state.user ? children : <Navigate to="/login" />;
}
