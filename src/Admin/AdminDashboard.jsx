// src/pages/AdminDashboard.jsx
import { useState } from 'react'
import Sidebar from './Sidebar'
import ClientesTable from './ClientesTable'
import './css/admin.css'

export default function AdminDashboard() {
  const [selected, setSelected] = useState('clientes')

  return (
    <div className="admin-container">
      <Sidebar onSelect={setSelected} />
      <div className="content-area">
        <div className="section-container">
          {selected === 'clientes' && <ClientesTable />}
          {selected === 'ordenes' && (<></>
            
          )}
          {selected === 'reportes' && (<></>
            
          )}
        </div>
      </div>
    </div>
  )
}