// src/Components/ListarEstudiantes.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import { IEstudiante } from "../Interfaces/IEstudiante";
import { ICarrera } from "../Interfaces/ICarrera";
import { IModalidad } from "../Interfaces/IModalidad";
import "../Estudiantes.css";

export function ListarEstudiantes() {
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [carreras, setCarreras] = useState<ICarrera[]>([]);
  const [modalidades, setModalidades] = useState<IModalidad[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar carreras
  useEffect(() => {
    const cargarCarreras = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch(`${appsettings.apiUrl}Carrera`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resp.ok) {
          const data = await resp.json();
          setCarreras(data);
        }
      } catch (error) {
        console.error("Error al cargar carreras:", error);
      }
    };
    cargarCarreras();
  }, []);

  // Cargar modalidades
  useEffect(() => {
    const cargarModalidades = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch(`${appsettings.apiUrl}Modalidad`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resp.ok) {
          const data = await resp.json();
          setModalidades(data);
        }
      } catch (error) {
        console.error("Error al cargar modalidades:", error);
      }
    };
    cargarModalidades();
  }, []);

  // Cargar estudiantes
  useEffect(() => {
    const obtenerEstudiantes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${appsettings.apiUrl}Estudiante`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setEstudiantes(data);
        }
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerEstudiantes();
  }, []);

  const getNombreCarrera = (codCarrera: number) => {
    const carrera = carreras.find(c => c.cod_Carrera === codCarrera);
    return carrera ? carrera.nombreCarrera : `Carrera ${codCarrera}`;
  };

  const getNombreModalidad = (codModalidad: number) => {
    const modalidad = modalidades.find(m => m.cod_Modalidad === codModalidad);
    return modalidad ? modalidad.modalidad : `Modalidad ${codModalidad}`;
  };

  const Eliminar = async (codEstudiante: number) => {
    if (window.confirm("¿Está seguro de eliminar este estudiante?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${appsettings.apiUrl}Estudiante/${codEstudiante}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.ok) {
          alert("Estudiante eliminado correctamente");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar el estudiante");
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando estudiantes...</div>;
  }

  return (
    <div className="usuarios-page">
      {/* Menú superior - SOLO CON LOGO */}
      <header className="topbar">
        <div className="logo">
          <h2>UAF</h2>
           <nav>
      <ul className="menuhorizontal">
        <li className="menuhorizontal-item" onClick={() => navigate("/dashboard")}>Inicio</li>
        <li className="menuhorizontal-item">Reportes</li>
        <li className="menuhorizontal-item">Nosotros</li>
      </ul>
    </nav>
        </div>
        <nav>
          <ul className="menuhorizontal">
            {/* Eliminados: Inicio, Reportes y Nosotros */}
          </ul>
        </nav>
      </header>

      <div className="usuarios-header">
        <h2>Gestión de Estudiantes</h2>
        <button
          className="btn add-user"
          onClick={() => navigate("/agregar-estudiante")}
        >
          + Agregar Estudiante
        </button>
      </div>
      <hr />

      <div className="table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Matrícula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th>ID Usuario</th>
              <th>Carrera</th>
              <th>Modalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.length === 0 ? (
              <tr>
                <td colSpan={11} className="sin-datos">
                  No hay estudiantes registrados
                </td>
              </tr>
            ) : (
              estudiantes.map((estudiante) => (
                <tr key={estudiante.cod_Estudiante}>
                  <td>{estudiante.cod_Estudiante}</td>
                  <td>{estudiante.matricula}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.apellido}</td>
                  <td>{estudiante.edad}</td>
                  <td>{estudiante.direccion}</td>
                  <td>
                    <span className={`estado-badge ${estudiante.estado?.toLowerCase()}`}>
                      {estudiante.estado}
                    </span>
                  </td>
                  <td>{estudiante.id_Usuario}</td>
                  <td>{getNombreCarrera(estudiante.cod_Carrera)}</td>
                  <td>{getNombreModalidad(estudiante.cod_Modalidad)}</td>
                  <td>
                    <button
                      className="btn edit"
                      onClick={() => navigate(`/editar-estudiante/${estudiante.cod_Estudiante}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => Eliminar(estudiante.cod_Estudiante)}
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

export default ListarEstudiantes;