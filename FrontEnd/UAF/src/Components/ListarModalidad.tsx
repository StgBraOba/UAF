import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import { IModalidad } from "../Interfaces/IModalidad";
import "../NuevoUsuario.css";
import "../Modalidad.css";


export function ListarModalidad() {
  const [modalidades, setModalidades] = useState<IModalidad[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerModalidades = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${appsettings.apiUrl}Modalidad`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setModalidades(data);
        } else {
          console.error("Error al obtener las modalidades");
        }
      } catch (error) {
        console.error("Error de conexión", error);
      }finally {
          setLoading(false);
        }
    };

    obtenerModalidades();
  }, []); 

  const Eliminar = async (id: number | undefined) => {
    if (!id) return;
    
    const confirmar = window.confirm("¿Estás seguro de eliminar esta modalidad?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      // Verifica si tu API usa /Eliminar/id o solo /id
      const response = await fetch(`${appsettings.apiUrl}Modalidad/Eliminar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Modalidad eliminada correctamente");
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
            <div className="loading">Cargando modalidades...</div>
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
        <h2>Gestión de Modalidad</h2>
        <button className="btn add-user" onClick={() => navigate("/agregar-modalidad")}>
          + Agregar Carrera +
        </button>
      </div>

    <table className="modalidad-table">
      <thead>
        <tr>
          <th>Cod_Modalidad</th>
          <th>Estado</th>
          <th>Modalidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {modalidades.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              Cargando datos o no hay modalidades registradas...
            </td>
          </tr>
        ) : (
          modalidades.map((item) => (
            <tr key={item.cod_Modalidad}>
              <td>{item.cod_Modalidad}</td>
              <td>{item.estado}</td>
              <td>{item.modalidad}</td>
              <td>
                <button
                  className="btn edit"
                 onClick={() => navigate(`/editar-modalidad/${item.cod_Modalidad}`)}
                >
                  Editar
                </button>
                <button
                  className="btn delete"
                  onClick={() => Eliminar(item.cod_Modalidad)}
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
export default ListarModalidad