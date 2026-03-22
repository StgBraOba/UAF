import React from "react";
import "../Usuarios.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../NuevoUsuario.css";
import { ICarrera } from "../Interfaces/ICarrera";


export function Carreras() {
  const [Carrera, setCarreras] = useState<ICarrera[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [seleccionadas, setSeleccionadas] = useState([]);

   // Cargar Carreras
    useEffect(() => {
      const obtenerCarreras = async () => {
        try {
          const token = localStorage.getItem("token");
          
          if (!token) {
            navigate("/");
            return;
          }
  
          // GET: api/Carrera
          const response = await fetch(`${appsettings.apiUrl}Carrera`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
  
          if (response.ok) {
            const data = await response.json();
            setCarreras(data);
            console.log("Carrera cargados:", data);
          } else {
            console.error("Error al cargar Carrera:", response.status);
            alert("Error al cargar los Carrera");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Error al conectar con el servidor");
        } finally {
          setLoading(false);
        }
      };
  
      obtenerCarreras();
    }, [navigate]);

    const Eliminar = async (codCarrera: number) => {
        if (window.confirm("¿Está seguro de eliminar esta carrera?")) {
          try {
            const token = localStorage.getItem("token");
    
            // DELETE: api/Docente/Eliminar/{id}
            const response = await fetch(`${appsettings.apiUrl}Carrera/Eliminar/${codCarrera}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            });
    
            if (response.ok) {
              alert("Carrera eliminada correctamente");
              // Actualizar la lista sin recargar la página
              setCarreras(Carrera.filter(d => d.cod_Carrera !== codCarrera));
            } else if (response.status === 404) {
              alert("Carrera no encontrado");
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
        <h2>Gestión de Carreras</h2>
        <button className="btn add-user" onClick={() => navigate("/agregar-carrera")}>
          + Agregar Carrera +
        </button>
      </div>
      <hr />

      {Carrera.length === 0 ? (
        <div className="sin-datos">
          No hay carreras registradas
        </div>
      ) : (
        <div className="table-container">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Facultad</th>
                
              </tr>
            </thead>
            <tbody>
              {Carrera.map((Carrera) => (
                <tr key={Carrera.cod_Carrera}>
                  <td>{Carrera.cod_Carrera}</td>
                  <td>{Carrera.nombreCarrera}</td>
                  <td>{Carrera.estado}</td>
                  <td>{Carrera.cod_Facultad}</td>
                  
                  
                  <td className="acciones-cell">
                    <button
                      className="btn edit"
                      onClick={() => navigate(`/editar-carrera/${Carrera.cod_Carrera}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => Eliminar(Carrera.cod_Carrera)}
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

     
    </div>
  )
}

export default Carreras;