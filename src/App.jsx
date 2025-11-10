import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'
import AdminDashboard from './dashboards/AdminDashboard'
import TecnicoDashboard from './dashboards/TecnicoDashboard'
import ClienteDashboard from './dashboards/ClienteDashboard'

export default function App() {

  return (

    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tecnico" element={<TecnicoDashboard />} />
        <Route path="/cliente" element={<ClienteDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
