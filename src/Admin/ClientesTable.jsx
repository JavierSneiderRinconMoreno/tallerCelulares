import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import "./css/cliente.css";

export default function ClientesTable() {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({});

  // Cargar clientes desde Supabase
  useEffect(() => {
    const fetchClientes = async () => {
      const { data, error } = await supabase
        .from("clientes")
        .select("id_interno, nombre, correo, telefono, whatsapp, direccion");

      if (error) {
        console.error("Error al obtener clientes:", error);
      } else {
        setClientes(data);
      }
    };
    fetchClientes();
  }, []);

  const handleEdit = (cliente) => {
    setEditando(cliente.id_interno);
    setFormData({
      nombre: cliente.nombre || "",
      correo: cliente.correo || "",
      telefono: cliente.telefono || "",
      whatsapp: cliente.whatsapp || "",
      direccion: cliente.direccion || "",
      tieneWhatsApp: cliente.whatsapp && cliente.whatsapp.trim() !== "" ? "Sí" : "No",
    });
  };

  const handleCancel = () => {
    setEditando(null);
    setFormData({});
  };

  const handleChange = (e, campo) => {
    setFormData({ ...formData, [campo]: e.target.value });
  };

  // Guardar cambios en Supabase
  const handleSave = async (id_interno) => {
    const { error } = await supabase
      .from("clientes")
      .update({
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        whatsapp: formData.tieneWhatsApp === "Sí" ? formData.whatsapp : null,
        direccion: formData.direccion,
      })
      .eq("id_interno", id_interno);

    if (error) {
      console.error("Error al guardar cambios:", error);
      alert("No tienes permisos para editar este cliente o ocurrió un error.");
    } else {
      setClientes((prev) =>
        prev.map((c) =>
          c.id_interno === id_interno
            ? {
                ...c,
                nombre: formData.nombre,
                correo: formData.correo,
                telefono: formData.telefono,
                whatsapp:
                  formData.tieneWhatsApp === "Sí"
                    ? formData.whatsapp
                    : null,
                direccion: formData.direccion,
              }
            : c
        )
      );
      setEditando(null);
    }
  };

  return (
    <div className="clientes-container">
      <h2>Gestión de Clientes</h2>
      <div className="tabla-responsive">
        <table className="tabla-clientes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>WhatsApp</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#777" }}>
                  No hay clientes registrados.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.id_interno}>
                  <td>{cliente.id_interno}</td>

                  {/* Nombre */}
                  <td>
                    {editando === cliente.id_interno ? (
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleChange(e, "nombre")}
                      />
                    ) : (
                      cliente.nombre
                    )}
                  </td>

                  {/* Correo */}
                  <td>
                    {editando === cliente.id_interno ? (
                      <input
                        type="email"
                        value={formData.correo}
                        onChange={(e) => handleChange(e, "correo")}
                      />
                    ) : (
                      cliente.correo
                    )}
                  </td>

                  {/* Teléfono */}
                  <td>
                    {editando === cliente.id_interno ? (
                      <input
                        type="text"
                        value={formData.telefono}
                        onChange={(e) => handleChange(e, "telefono")}
                      />
                    ) : (
                      cliente.telefono || "—"
                    )}
                  </td>

                  {/* WhatsApp */}
                  <td>
                    {editando === cliente.id_interno ? (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <select
                          value={formData.tieneWhatsApp}
                          onChange={(e) => handleChange(e, "tieneWhatsApp")}
                        >
                          <option value="Sí">Sí</option>
                          <option value="No">No</option>
                        </select>
                        {formData.tieneWhatsApp === "Sí" && (
                          <input
                            type="text"
                            placeholder="Número de WhatsApp"
                            value={formData.whatsapp}
                            onChange={(e) => handleChange(e, "whatsapp")}
                            style={{ marginTop: "6px" }}
                          />
                        )}
                      </div>
                    ) : cliente.whatsapp ? (
                      cliente.whatsapp
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Dirección */}
                  <td>
                    {editando === cliente.id_interno ? (
                      <input
                        type="text"
                        value={formData.direccion}
                        onChange={(e) => handleChange(e, "direccion")}
                      />
                    ) : (
                      cliente.direccion || "—"
                    )}
                  </td>

                  {/* Acciones */}
                  <td>
                    {editando === cliente.id_interno ? (
                      <div className="acciones">
                        <button
                          className="btn guardar"
                          onClick={() => handleSave(cliente.id_interno)}
                        >
                          Guardar
                        </button>
                        <button className="btn cancelar" onClick={handleCancel}>
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn editar"
                        onClick={() => handleEdit(cliente)}
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
