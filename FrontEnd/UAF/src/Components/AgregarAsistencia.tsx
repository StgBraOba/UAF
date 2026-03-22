import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../Estudiantes.css";

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

export function AgregarAsistencia() {
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [grupos, setGrupos] = useState<IGrupo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cod_Estudiante: "",
    cod_Grupo: "",
    presente: "SI",
    fecha: new Date().toISOString().slice(0, 16) // Formato: YYYY-MM-DDTHH:mm
  });

  // Cargar estudiantes y grupos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          navigate("/");
          return;
        }
        
        // Cargar estudiantes
        const estudiantesResp = await fetch(`${appsettings.apiUrl}Estudiante`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Cargar grupos
        const gruposResp = await fetch(`${appsettings.apiUrl}Grupo`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!estudiantesResp.ok || !gruposResp.ok) {
          throw new Error("Error al cargar los datos");
        }

        const estudiantesData = await estudiantesResp.json();
        const gruposData = await gruposResp.json();
        
        // Filtrar solo estudiantes activos
        const estudiantesActivos = Array.isArray(estudiantesData) 
          ? estudiantesData.filter((e: any) => e.estado?.toLowerCase() === "activo")
          : [];
          
        setEstudiantes(estudiantesActivos);
        setGrupos(gruposData);
        
      } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Error al cargar los datos necesarios");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [navigate]);

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
    if (!formData.cod_Estudiante || !formData.cod_Grupo || !formData.fecha) {
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

      const asistenciaData = {
        cod_Estudiante: parseInt(formData.cod_Estudiante),
        cod_Grupo: parseInt(formData.cod_Grupo),
        presente: formData.presente,
        fecha: new Date(formData.fecha).toISOString()
      };

      console.log("Enviando datos:", asistenciaData);

      const response = await fetch(`${appsettings.apiUrl}Asistencia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(asistenciaData)
      });

      if (response.ok) {
        alert("Asistencia registrada correctamente");
        navigate("/asistencia");
      } else {
        const errorText = await response.text();
        alert(`Error al registrar asistencia: ${response.status} - ${errorText || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando formulario...</div>;
  }

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
        <h2>Registrar Asistencia</h2>
      </div>
      <hr />

      <div className="form-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Estudiante */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Estudiante:
            </label>
            <select
              name="cod_Estudiante"
              value={formData.cod_Estudiante}
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
              <option value="">Seleccione un estudiante</option>
              {estudiantes.map(est => (
                <option key={est.cod_Estudiante} value={est.cod_Estudiante}>
                  {est.nombre} {est.apellido} - {est.matricula}
                </option>
              ))}
            </select>
          </div>

          {/* Grupo */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Grupo:
            </label>
            <select
              name="cod_Grupo"
              value={formData.cod_Grupo}
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
              <option value="">Seleccione un grupo</option>
              {grupos.map(grupo => (
                <option key={grupo.cod_Grupo} value={grupo.cod_Grupo}>
                  GRP-{grupo.codigoGrupo.toString().padStart(3, '0')}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Fecha y Hora:
            </label>
            <input
              type="datetime-local"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Presente */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Estado:
            </label>
            <select
              name="presente"
              value={formData.presente}
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
              <option value="SI">Presente</option>
              <option value="NO">Ausente</option>
            </select>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button
              type="button"
              className="btn delete"
              onClick={() => navigate("/asistencia")}
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
              {saving ? "Guardando..." : "Registrar Asistencia"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarAsistencia;