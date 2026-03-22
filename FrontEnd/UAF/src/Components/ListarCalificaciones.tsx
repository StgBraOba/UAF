import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import { ICalificacion } from "../Interfaces/ICalificacion";
import { IEstudiante } from "../Interfaces/IEstudiante";
import { IGrupo } from "../Interfaces/IGrupo";
import "../Estudiantes.css";

export function ListarCalificaciones() {
  const [calificaciones, setCalificaciones] = useState<ICalificacion[]>([]);
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [grupos, setGrupos] = useState<IGrupo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar estudiantes
  useEffect(() => {
    const cargarEstudiantes = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch(`${appsettings.apiUrl}Estudiante`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resp.ok) {
          const data = await resp.json();
          setEstudiantes(data);
        }
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
      }
    };
    cargarEstudiantes();
  }, []);

  // Cargar grupos
  useEffect(() => {
    const cargarGrupos = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch(`${appsettings.apiUrl}Grupo`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resp.ok) {
          const data = await resp.json();
          setGrupos(data);
        }
      } catch (error) {
        console.error("Error al cargar grupos:", error);
      }
    };
    cargarGrupos();
  }, []);

  // Cargar calificaciones
  useEffect(() => {
    const obtenerCalificaciones = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${appsettings.apiUrl}Calificacion`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setCalificaciones(data);
        }
      } catch (error) {
        console.error("Error al cargar calificaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerCalificaciones();
  }, []);

  const getNombreEstudiante = (codEstudiante: number) => {
    const estudiante = estudiantes.find(e => e.cod_Estudiante === codEstudiante);
    return estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : `Estudiante ${codEstudiante}`;
  };

  const getCodigoGrupo = (codGrupo: number) => {
    const grupo = grupos.find(g => g.cod_Grupo === codGrupo);
    return grupo ? `GRP-${grupo.codigoGrupo.toString().padStart(3, '0')}` : `Grupo ${codGrupo}`;
  };

  const getNotaColor = (nota: number) => {
    if (nota >= 90) return { color: '#28a745', fontWeight: 'bold' };
    if (nota >= 80) return { color: '#007bff', fontWeight: 'bold' };
    if (nota >= 70) return { color: '#ffc107', fontWeight: 'bold' };
    if (nota >= 60) return { color: '#fd7e14', fontWeight: 'bold' };
    return { color: '#dc3545', fontWeight: 'bold' };
  };

  const Eliminar = async (codCalificacion: number) => {
    if (window.confirm("¿Está seguro de eliminar esta calificación?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${appsettings.apiUrl}Calificacion/${codCalificacion}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.ok) {
          alert("Calificación eliminada correctamente");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar la calificación");
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando calificaciones...</div>;
  }

  return (
    <div className="usuarios-page">
      {/* Menú superior */}
      <header className="topbar">
        <div className="logo">
          <h2>UAF</h2>
        </div>
        <nav>
          <ul className="menuhorizontal">
            <li className="menuhorizontal-item" onClick={() => navigate("/dashboard")}>
              Inicio
            </li>
            <li className="menuhorizontal-item">Reportes</li>
            <li className="menuhorizontal-item">Nosotros</li>
          </ul>
        </nav>
      </header>

      <div className="usuarios-header">
        <h2>Gestión de Calificaciones</h2>
        <button
          className="btn add-user"
          onClick={() => navigate("/agregar-calificacion")}
        >
          + Agregar Calificación
        </button>
      </div>
      <hr />

      <div className="table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Estudiante</th>
              <th>Grupo</th>
              <th>Nota Final</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {calificaciones.length === 0 ? (
              <tr>
                <td colSpan={6} className="sin-datos">
                  No hay calificaciones registradas
                </td>
              </tr>
            ) : (
              calificaciones.map((calificacion) => (
                <tr key={calificacion.cod_Calificaion}>
                  <td>{calificacion.cod_Calificaion}</td>
                  <td>{getNombreEstudiante(calificacion.cod_Estudiante)}</td>
                  <td>{getCodigoGrupo(calificacion.cod_Grupo)}</td>
                  <td>
                    <span style={getNotaColor(calificacion.notaFinal)}>
                      {calificacion.notaFinal.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span className={`estado-badge ${calificacion.notaFinal >= 60 ? 'activo' : 'inactivo'}`}>
                      {calificacion.notaFinal >= 60 ? 'Aprobado' : 'Reprobado'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn edit"
                      onClick={() => navigate(`/editar-calificacion/${calificacion.cod_Calificaion}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => Eliminar(calificacion.cod_Calificaion)}
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
    </div>
  );
}

export default ListarCalificaciones;