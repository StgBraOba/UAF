import React from "react";
import "../Usuarios.css";
import "../Facultad.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import { IFacultad } from "../Interfaces/IFacultad";

export function ListarFacultades() {
  const [facultades, setFacultades] = useState<IFacultad[]>([]);
  const navigate = useNavigate();

  const normalizeFacultad = (item: any): IFacultad => ({
    cod_Facultad:
      item?.Cod_Facultad ??
      item?.cod_Facultad ??
      item?.id_Facultad ??
      item?.id ??
      0,
    nombre: item?.Nombre ?? item?.nombre ?? item?.Name ?? item?.name ?? "",
    estado: item?.Estado ?? item?.estado ?? item?.Status ?? item?.status ?? "Activo",
  });

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found when fetching facultades");
        return;
      }

      // Intentar varios endpoints posibles para compatibilidad con diferentes backends
      const endpoints = [
        `${appsettings.apiUrl}Facultad`,
        `${appsettings.apiUrl}Facultades`,
        `${appsettings.apiUrl}Facultad/Listar`,
        `${appsettings.apiUrl}Facultad/Obtener`,
      ];

      let ok = false;
      for (const url of endpoints) {
        try {
          const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
          console.log("fetchList try:", url, resp.status);
          if (resp.status === 401) {
            alert("No autorizado. Inicia sesión nuevamente.");
            window.location.href = "/";
            return;
          }
          if (!resp.ok) continue;

          const data = await resp.json();
          // Algunos backends devuelven { data: [...] } o { result: [...] }
          const list = data?.data || data?.result || (Array.isArray(data) ? data : null);
          if (list && Array.isArray(list)) {
            setFacultades(list.map(normalizeFacultad));
            ok = true;
            break;
          }

          // Si la respuesta es un objeto directo (posible lista), intentar usarlo como array
          if (Array.isArray(data)) {
            setFacultades(data.map(normalizeFacultad));
            ok = true;
            break;
          }

          // Si la API devuelve { items: [...] }
          if (data?.items && Array.isArray(data.items)) {
            setFacultades(data.items.map(normalizeFacultad));
            ok = true;
            break;
          }

          // Si llegamos aquí, no obtuvimos lista válida, continuar a siguiente endpoint
        } catch (e) {
          console.warn("fetchList try error", e);
        }
      }

      if (!ok) console.error("No se pudo obtener la lista de facultades: ningún endpoint devolvió lista válida");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const Eliminar = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta facultad?")) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No autenticado. Por favor inicia sesión.");
      window.location.href = "/";
      return;
    }

    try {
      const response = await fetch(`${appsettings.apiUrl}Facultad/Eliminar/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Eliminar Facultad status:", response.status);
      if (response.ok) {
        alert("Facultad eliminada correctamente");
        await fetchList();
      } else if (response.status === 401) {
        alert("No autorizado. Inicia sesión nuevamente.");
        window.location.href = "/";
      } else {
        const txt = await response.text();
        alert(txt || "Error al eliminar facultad");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión al eliminar facultad");
    }
  };

  return (
    
    <div className="Facultad-page"  >
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


      <div className="Facultad-header">
        <h2>Gestión de Facultad</h2>
        <button className="btn add-user" onClick={() => navigate("/NuevoFacultad")}>
          + Agregar Facultad +
        </button>
      </div>
      <hr />

      <table className="Facultad-table">
        <thead>
          <tr>
            <th>Id Facultad</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facultades.map((f) => (
            <tr key={f.cod_Facultad}>
              <td>{f.cod_Facultad}</td>
              <td>{f.nombre}</td>
              <td>{f.estado}</td>
              <td>
                <button
                  className="btn edit"
                  onClick={() =>
                    navigate(`/EditarFacultad/${f.cod_Facultad}`, { state: { facultad: f } })
                  }
                >
                  Editar
                </button>
                <button className="btn delete" onClick={() => Eliminar(f.cod_Facultad ?? 0)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default ListarFacultades;
