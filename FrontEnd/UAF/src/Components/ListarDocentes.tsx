import React from "react";
import "../Usuarios.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../NuevoUsuario.css";
import { IDocente } from "../Interfaces/IDocente";

export function ListarDocentes() {
  const [docentes, setDocentes] = useState<IDocente[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar docentes
  useEffect(() => {
    const obtenerDocentes = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          navigate("/");
          return;
        }

        // GET: api/Docente
        const response = await fetch(`${appsettings.apiUrl}Docente`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDocentes(data);
          console.log("Docentes cargados:", data);
        } else {
          console.error("Error al cargar docentes:", response.status);
          alert("Error al cargar los docentes");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    obtenerDocentes();
  }, [navigate]);

  const Eliminar = async (codDocente: number) => {
    if (window.confirm("¿Está seguro de eliminar este docente?")) {
      try {
        const token = localStorage.getItem("token");

        // DELETE: api/Docente/Eliminar/{id}
        const response = await fetch(`${appsettings.apiUrl}Docente/Eliminar/${codDocente}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          alert("Docente eliminado correctamente");
          // Actualizar la lista sin recargar la página
          setDocentes(docentes.filter(d => d.cod_Docente !== codDocente));
        } else if (response.status === 404) {
          alert("Docente no encontrado");
        } else {
          const error = await response.text();
          alert(`Error al eliminar: ${error}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor");
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Cargando docentes...</div>
      </div>
    );
  }

  return (
    <div className="usuarios-page">
      {/* MENU SUPERIOR */}
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
        <h2>Gestión de Docentes</h2>
        <button className="btn add-user" onClick={() => navigate("/agregar-docente")}>
          + Agregar Docente +
        </button>
      </div>
      <hr />

      {docentes.length === 0 ? (
        <div className="sin-datos">
          No hay docentes registrados
        </div>
      ) : (
        <div className="table-container">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th>ID Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map((docente) => (
                <tr key={docente.cod_Docente}>
                  <td>{docente.cod_Docente}</td>
                  <td>{docente.nombre}</td>
                  <td>{docente.apellido}</td>
                  <td>{docente.edad}</td>
                  <td>{docente.direccion}</td>
                  <td>
                    <span className={`estado-badge ${docente.estado?.toLowerCase()}`}>
                      {docente.estado}
                    </span>
                  </td>
                  <td>{docente.id_Usuario}</td>
                  <td className="acciones-cell">
                    <button
                      className="btn edit"
                      onClick={() => navigate(`/editar-docente/${docente.cod_Docente}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => Eliminar(docente.cod_Docente)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resumen de docentes */}
      {docentes.length > 0 && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Total Docentes:</strong> {docentes.length}
          </div>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Activos:</strong>
            <span style={{ color: '#28a745', fontWeight: 'bold', marginLeft: '5px' }}>
              {docentes.filter(d => d.estado?.toLowerCase() === 'activo').length}
            </span>
          </div>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Inactivos:</strong>
            <span style={{ color: '#dc3545', fontWeight: 'bold', marginLeft: '5px' }}>
              {docentes.filter(d => d.estado?.toLowerCase() === 'inactivo').length}
            </span>
          </div>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Promedio Edad:</strong>
            <span style={{ fontWeight: 'bold' }}>
              {(docentes.reduce((acc, d) => acc + d.edad, 0) / docentes.length).toFixed(1)} años
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarDocentes;