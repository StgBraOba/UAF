import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../Estudiantes.css";

// Definir la interfaz directamente aquí para evitar problemas de importación
interface IGrupo {
    cod_Grupo: number;
    cod_Inscripcion: number;
    cod_Docente: number;
    cupo: number;
    estado: string;
    codigoGrupo: number;
}

export function ListarGrupos() {
  const [grupos, setGrupos] = useState<IGrupo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar grupos
  useEffect(() => {
    const obtenerGrupos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${appsettings.apiUrl}Grupo`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setGrupos(data);
          console.log("Grupos cargados:", data);
        }
      } catch (error) {
        console.error("Error al cargar grupos:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerGrupos();
  }, []);

  const getEstadoCupo = (cupo: number) => {
    if (cupo > 10) return { color: '#28a745', texto: 'Disponible' };
    if (cupo > 5) return { color: '#ffc107', texto: 'Limitado' };
    if (cupo > 0) return { color: '#fd7e14', texto: 'Pocos cupos' };
    return { color: '#dc3545', texto: 'Lleno' };
  };

  const Eliminar = async (codGrupo: number) => {
    if (window.confirm("¿Está seguro de eliminar este grupo?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${appsettings.apiUrl}Grupo/${codGrupo}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.ok) {
          alert("Grupo eliminado correctamente");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar el grupo");
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando grupos...</div>;
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
        <h2>Gestión de Grupos</h2>
        <button
          className="btn add-user"
          onClick={() => navigate("/agregar-grupo")}
        >
          + Agregar Grupo
        </button>
      </div>
      <hr />

      <div className="table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Código Grupo</th>
              <th>Código Inscripción</th>
              <th>Código Docente</th>
              <th>Cupo</th>
              <th>Estado Cupo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {grupos.length === 0 ? (
              <tr>
                <td colSpan={8} className="sin-datos">
                  No hay grupos registrados
                </td>
              </tr>
            ) : (
              grupos.map((grupo) => {
                const estadoCupo = getEstadoCupo(grupo.cupo);
                
                return (
                  <tr key={grupo.cod_Grupo}>
                    <td>{grupo.cod_Grupo}</td>
                    <td>
                      <strong>GRP-{grupo.codigoGrupo.toString().padStart(3, '0')}</strong>
                    </td>
                    <td>{grupo.cod_Inscripcion}</td>
                    <td>{grupo.cod_Docente}</td>
                    <td>
                      <span style={{ fontWeight: 'bold' }}>
                        {grupo.cupo}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        color: estadoCupo.color, 
                        fontWeight: 'bold',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: `${estadoCupo.color}20`
                      }}>
                        {estadoCupo.texto}
                      </span>
                    </td>
                    <td>
                      <span className={`estado-badge ${grupo.estado?.toLowerCase()}`}>
                        {grupo.estado}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn edit"
                        onClick={() => navigate(`/editar-grupo/${grupo.cod_Grupo}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => Eliminar(grupo.cod_Grupo)}
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

      {/* Resumen de grupos */}
      {grupos.length > 0 && (
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
            <strong>Total Grupos:</strong> {grupos.length}
          </div>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Cupos Totales:</strong> {grupos.reduce((acc, curr) => acc + curr.cupo, 0)}
          </div>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Promedio Cupo:</strong> {(grupos.reduce((acc, curr) => acc + curr.cupo, 0) / grupos.length).toFixed(0)}
          </div>
          <div style={{ textAlign: 'center', padding: '10px 20px', background: 'white', borderRadius: '8px' }}>
            <strong>Grupos Activos:</strong> 
            <span style={{ color: '#28a745', fontWeight: 'bold', marginLeft: '5px' }}>
              {grupos.filter(g => g.estado?.toLowerCase() === 'activo').length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarGrupos;