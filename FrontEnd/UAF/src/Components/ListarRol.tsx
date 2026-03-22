import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import { Rol } from "../Interfaces/IRol";
import "../Usuarios.css";
import "../Modalidad.css";



export function ListarRol() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRoles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${appsettings.apiUrl}Rol`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          console.error("Error al obtener las Roles");
        }
      } catch (error) {
        console.error("Error de conexión", error);
      }finally {
          setLoading(false);
        }
    };

    obtenerRoles();
  }, []); 

  const Eliminar = async (id: number | undefined) => {
    if (!id) return;
    
    const confirmar = window.confirm("¿Estás seguro de eliminar este rol?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      // Verifica si tu API usa /Eliminar/id o solo /id
      const response = await fetch(`${appsettings.apiUrl}Rol/Eliminar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Rol eliminado correctamente");
        window.location.reload(); 
      } else {
        alert("Error al eliminar la modalidad");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };
   if (loading) {
        return (
          <div className="loading-container">
            <div className="loading">Cargando Roles...</div>
          </div>
        );
      }

  return (
    <div>
            <header className="topbar">
            <div className="logo">
              <h2>UAF</h2>
            </div>

            <nav>
              <ul className="menuhorizontal">
                <li className="menuhorizontal-item" onClick={() => navigate("/dashboard")}>Inicio</li>
                <li className="menuhorizontal-item">Reportes</li>
                <li className="menuhorizontal-item">Nosotros</li>
              </ul>
            </nav>
          </header>

      <div className="usuarios-header">
        <h2>Gestión de Roles</h2>
        <button className="btn add-user" onClick={() => navigate("/agregar-rol")}>
          + Agregar Rol +
        </button>
      </div>

    <table className="modalidad-table">
      <thead>
        <tr>
          <th>IdRol</th>
          <th>Estado</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {roles.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              Cargando datos o no hay modalidades registradas...
            </td>
          </tr>
        ) : (
          roles.map((item) => (
            <tr key={item.id_Rol}>
              <td>{item.id_Rol}</td>
              <td>{item.estado}</td>
              <td>{item.rol}</td>
              <td>
                <button
                  className="btn edit"
                 onClick={() => navigate(`/editar-rol/${item.id_Rol}`)}
                >
                  Editar
                </button>
                <button
                  className="btn delete"
                  onClick={() => Eliminar(item.id_Rol)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    </div>

  );
}
export default ListarRol