import { useState } from 'react'
import { supabase } from '../supabase/client'
import '../css/RegisterPage.css'

export default function RegisterPage() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setMensaje('Registrando...')

    // Registrar usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: clave
    })

    console.log('🔍 Resultado signUp:', { data, error })

    if (error) {
      console.error('❌ Error en signUp:', error)
      setMensaje('Error: ' + error.message)
      return
    }

    const user = data?.user
    if (!user) {
      console.warn('⚠️ No se devolvió usuario, revisa confirmación de correo')
      return
    }

    console.log('✅ Usuario creado:', user)

    // Insertar datos en la tabla clientes (sin enviar id_cliente)
    const { error: insertError } = await supabase.from('clientes').insert([
      { nombre, correo }
    ])

    if (insertError) {
      console.error('❌ Error al insertar cliente:', insertError)
      setMensaje('Error al guardar cliente: ' + insertError.message)
      return
    }

    setMensaje('✅ Cliente registrado exitosamente.')
  }

  return (
    <div className="register-page">
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
        <button type="submit">Crear cuenta</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}
