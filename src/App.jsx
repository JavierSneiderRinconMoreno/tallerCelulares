import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import TecnicoDashboard from "./dashboards/TecnicoDashboard";
import ClienteDashboard from "./dashboards/ClienteDashboard";

import AdminDashboard from "./Admin/AdminDashboard";
import ClientesTable from "./Admin/ClientesTable";
import Sidebar from "./Admin/Sidebar";

import "./Admin/css/admin.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tecnico" element={<TecnicoDashboard />} />
        <Route path="/cliente" element={<ClienteDashboard />} />

        {/* Rutas del administrador */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}
