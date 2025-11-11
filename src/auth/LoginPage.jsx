import { useState } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'
import '../css/LoginPage.css'

export default function LoginPage() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [codigo, setCodigo] = useState('')
  const [mensaje, setMensaje] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setMensaje('')

    // 🔹 1. Iniciar sesión con Supabase Auth
    const { data: sessionData, error: loginError } = await supabase.auth.signInWithPassword({
      email: correo,
      password: clave
    })
    if (loginError) return setMensaje(loginError.message)

    // 🔹 2. Verificar si el usuario está en la tabla tecnicos
    const { data: tecnico, error: errorTec } = await supabase
      .from('tecnicos')
      .select('rol')
      .eq('correo', correo)
      .maybeSingle()

    if (errorTec) {
      console.error(errorTec)
      setMensaje('Error verificando rol del usuario')
      return
    }

    // 🔹 3. Redirigir según el tipo de usuario
    if (tecnico) {
      if (tecnico.rol === 'Administrador') {
        navigate('/admin')
      } else {
        navigate('/tecnico')
      }
    } else {
      // 🔹 4. Si no está en tecnicos, verificar si es cliente
      const { data: cliente, error: errorCli } = await supabase
        .from('clientes')
        .select('id_cliente')
        .eq('correo', correo)
        .maybeSingle()

      if (errorCli) {
        console.error(errorCli)
        setMensaje('Error verificando cliente')
        return
      }

      if (cliente) {
        navigate('/cliente')
      } else {
        setMensaje('Usuario no encontrado en el sistema.')
      }
    }
  }

  const handleSeguimiento = async () => {
    const { data, error } = await supabase
      .from('ordenes')
      .select('estado')
      .eq('codigo_seguimiento', codigo)
      .single()

    if (error || !data) setMensaje('Código no encontrado o caducado')
    else setMensaje(`Estado actual: ${data.estado}`)
  }

  const irARegistro = () => {
    navigate('/register')
  }

  return (
    <div className="login-page">
      <h2>Taller de Celulares</h2>
      <div className="login-container">
        {/* Columna izquierda: Login */}
        <div className="login-section">
          <h3>Inicio de Sesión</h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
          </form>
          <button className="secondary" onClick={irARegistro}>
            Crear nuevo usuario
          </button>
        </div>

        {/* Columna derecha: Seguimiento */}
        <div className="seguimiento-section">
          <h3>Consultar Estado de Orden</h3>
          <input
            type="text"
            placeholder="Código de seguimiento"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button onClick={handleSeguimiento}>Consultar</button>
        </div>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  )
}
