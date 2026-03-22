import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../Estudiantes.css";

export function AgregarGrupo() {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cod_Inscripcion: "",
    cod_Docente: "",
    cupo: "",
    estado: "Activo",
    codigoGrupo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.cod_Inscripcion || !formData.cod_Docente || !formData.cupo || !formData.codigoGrupo) {
      alert("Por favor, complete todos los campos");
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      const grupoData = {
        cod_Inscripcion: parseInt(formData.cod_Inscripcion),
        cod_Docente: parseInt(formData.cod_Docente),
        cupo: parseInt(formData.cupo),
        estado: formData.estado,
        codigoGrupo: parseInt(formData.codigoGrupo)
      };

      console.log("Enviando datos:", grupoData);

      const response = await fetch(`${appsettings.apiUrl}Grupo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(grupoData)
      });

      if (response.ok) {
        alert("Grupo agregado correctamente");
        navigate("/grupos");
      } else {
        const errorText = await response.text();
        alert(`Error al agregar grupo: ${response.status} - ${errorText || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="usuarios-page">
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
        <h2>Agregar Grupo</h2>
      </div>
      <hr />

      <div className="form-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Código Grupo */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Código Grupo:
            </label>
            <input
              type="number"
              name="codigoGrupo"
              value={formData.codigoGrupo}
              onChange={handleChange}
              required
              placeholder="Ej: 1, 2, 3..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Código Inscripción */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Código Inscripción:
            </label>
            <input
              type="number"
              name="cod_Inscripcion"
              value={formData.cod_Inscripcion}
              onChange={handleChange}
              required
              placeholder="Ingrese el código de inscripción"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Código Docente */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Código Docente:
            </label>
            <input
              type="number"
              name="cod_Docente"
              value={formData.cod_Docente}
              onChange={handleChange}
              required
              placeholder="Ingrese el código del docente"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Cupo */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Cupo:
            </label>
            <input
              type="number"
              name="cupo"
              value={formData.cupo}
              onChange={handleChange}
              required
              min="0"
              placeholder="Ingrese el cupo máximo"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Estado */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Estado:
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                fontSize: '16px'
              }}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button
              type="button"
              className="btn delete"
              onClick={() => navigate("/grupos")}
              style={{ padding: '12px 24px' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn add-user"
              disabled={saving}
              style={{ 
                padding: '12px 24px',
                opacity: saving ? 0.7 : 1,
                cursor: saving ? 'not-allowed' : 'pointer'
              }}
            >
              {saving ? "Guardando..." : "Guardar Grupo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarGrupo;