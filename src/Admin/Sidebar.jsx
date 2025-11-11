// src/components/Sidebar.jsx
import { useState } from 'react'
import './css/sidebar.css'

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState('clientes')

  const handleSelect = (option) => {
    setActive(option)
    onSelect(option)
  }

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Panel Admin</h2>
      <ul className="sidebar-menu">
        <li
          className={`menu-item ${active === 'clientes' ? 'active' : ''}`}
          onClick={() => handleSelect('clientes')}
        >
          Clientes
        </li>
        <li
          className={`menu-item ${active === 'ordenes' ? 'active' : ''}`}
          onClick={() => handleSelect('ordenes')}
        >
          Órdenes
        </li>
        <li
          className={`menu-item ${active === 'reportes' ? 'active' : ''}`}
          onClick={() => handleSelect('reportes')}
        >
          Reportes
        </li>
      </ul>
    </div>
  )
}
