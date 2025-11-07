import { AuthProvider } from "./contexts/AuthContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import AppRoutes from "./routes/AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <AppRoutes />
      </PaymentProvider>
    </AuthProvider>
  );
}
