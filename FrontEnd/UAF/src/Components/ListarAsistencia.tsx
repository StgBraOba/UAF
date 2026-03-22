import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../Estudiantes.css";

// Interfaces
interface IAsistencia {
    cod_Asistencia: number;
    fecha: string;
    presente: string;
    cod_Grupo: number;
    cod_Estudiante: number;
}

interface IEstudiante {
    cod_Estudiante: number;
    nombre: string;
    apellido: string;
    matricula: number;
}

interface IGrupo {
    cod_Grupo: number;
    codigoGrupo: number;
}

export function ListarAsistencia() {
  const [asistencias, setAsistencias] = useState<IAsistencia[]>([]);
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

  // Cargar asistencias
  useEffect(() => {
    const obtenerAsistencias = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${appsettings.apiUrl}Asistencia`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setAsistencias(data);
          console.log("Asistencias cargadas:", data);
        }
      } catch (error) {
        console.error("Error al cargar asistencias:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerAsistencias();
  }, []);

  const getNombreEstudiante = (codEstudiante: number) => {
    const estudiante = estudiantes.find(e => e.cod_Estudiante === codEstudiante);
    return estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : `Estudiante ${codEstudiante}`;
  };

  const getCodigoGrupo = (codGrupo: number) => {
    const grupo = grupos.find(g => g.cod_Grupo === codGrupo);
    return grupo ? `GRP-${grupo.codigoGrupo.toString().padStart(3, '0')}` : `Grupo ${codGrupo}`;
  };

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPresenteColor = (presente: string) => {
    return presente?.toLowerCase() === 'si' 
      ? { color: '#28a745', fontWeight: 'bold', backgroundColor: '#d4edda', padding: '4px 8px', borderRadius: '4px' }
      : { color: '#dc3545', fontWeight: 'bold', backgroundColor: '#f8d7da', padding: '4px 8px', borderRadius: '4px' };
  };

  const Eliminar = async (codAsistencia: number) => {
    if (window.confirm("¿Está seguro de eliminar esta asistencia?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${appsettings.apiUrl}Asistencia/${codAsistencia}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.ok) {
          alert("Asistencia eliminada correctamente");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar la asistencia");
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando asistencias...</div>;
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
        <h2>Gestión de Asistencias</h2>
        <button
          className="btn add-user"
          onClick={() => navigate("/agregar-asistencia")}
        >
          + Registrar Asistencia
        </button>
      </div>
      <hr />

      <div className="table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Estudiante</th>
              <th>Grupo</th>
              <th>Presente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.length === 0 ? (
              <tr>
                <td colSpan={6} className="sin-datos">
                  No hay asistencias registradas
                </td>
              </tr>
            ) : (
              asistencias.map((asistencia) => {
                const presenteStyle = getPresenteColor(asistencia.presente);
                
                return (
                  <tr key={asistencia.cod_Asistencia}>
                    <td>{asistencia.cod_Asistencia}</td>
                    <td>{formatearFecha(asistencia.fecha)}</td>
                    <td>{getNombreEstudiante(asistencia.cod_Estudiante)}</td>
                    <td>{getCodigoGrupo(asistencia.cod_Grupo)}</td>
                    <td>
                      <span style={presenteStyle}>
                        {asistencia.presente?.toUpperCase() || 'NO'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn edit"
                        onClick={() => navigate(`/editar-asistencia/${asistencia.cod_Asistencia}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => Eliminar(asistencia.cod_Asistencia)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Resumen de asistencias */}
      {asistencias.length > 0 && (
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
            <strong>Total Asistencias:</strong> {asistencias.length}
          </div>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Presentes:</strong> 
            <span style={{ color: '#28a745', fontWeight: 'bold', marginLeft: '5px' }}>
              {asistencias.filter(a => a.presente?.toLowerCase() === 'si').length}
            </span>
          </div>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Ausentes:</strong> 
            <span style={{ color: '#dc3545', fontWeight: 'bold', marginLeft: '5px' }}>
              {asistencias.filter(a => a.presente?.toLowerCase() !== 'si').length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarAsistencia;