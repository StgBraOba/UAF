import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";

import "../AgregarModalidad.css";
import { IModalidad } from "../Interfaces/IModalidad";


export function NuevaModalidad() {
      const [modalidades, setModalidades] = useState<IModalidad[]>([]);
      const [loading, setLoading] = useState(false);
      const [formData, setFormData] = useState({
        estado: "Activo",
        modalidad: "",
      
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const Guardar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.modalidad) {
      alert("Complete el campo de modalidad obligatoriamente.");
      return;
    }

    const datosEnviar = {
                estado: formData.estado,
                modalidad: formData.modalidad.trim(),
            };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${appsettings.apiUrl}Modalidad/NuevaModalidad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosEnviar),
      });

      if (response.status === 401) {
        alert("No autorizado. Inicie sesión nuevamente.");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        alert("Error: " + errorText);
        return;
      }

      alert("Modalidad creada correctamente");
      navigate("/Modalidad"); 

    } catch (error) {
      console.error(error);
      alert("Error de conexión al guardar modalidad");
    }
  };

  const volver = () => {
    navigate("/Modalidad");
  };

  return (
    <div className="nuevo-usuario-page"> 
      <div className="form-container">
        <h2>Crear Nueva Modalidad</h2>
        
        <form onSubmit={Guardar}>
            <div className="form-group">
            <label>Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nombre de la Modalidad</label>
            <input
              type="text"
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
              placeholder="Ej: Presencial, Híbrido..."
              required
            />
          </div>

          

          <div className="form-actions">
            <button type="submit" className="btn submit">
              Guardar Modalidad
            </button>
            <button type="button" className="btn cancel" onClick={volver}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NuevaModalidad