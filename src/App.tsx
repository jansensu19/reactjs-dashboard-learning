import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./views/DashboardOverview";
import TransactionsPage from "./views/TransactionsPage";
import CustomersPage from "./views/CustomersPage";
import SettingsPage from "./views/SettingsPage";
import NotFoundPage from "./views/NotFoundPage";
import LoginModal from "./components/auth/LoginModal";
import { useAuth } from "./context/AuthContext";
import ProductsPage from "./views/ProductsPage";
import TicketsPage from "./views/TicketsPage";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginModal /> : <Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
