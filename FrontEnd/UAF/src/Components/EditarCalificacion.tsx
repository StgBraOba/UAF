import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../Estudiantes.css";

// Definir interfaces
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

interface ICalificacion {
    cod_Calificaion: number;
    cod_Estudiante: number;
    cod_Grupo: number;
    notaFinal: number;
}

export function EditarCalificacion() {
  const { id } = useParams<{ id: string }>();
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [grupos, setGrupos] = useState<IGrupo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cod_Calificaion: 0,
    cod_Estudiante: "",
    cod_Grupo: "",
    notaFinal: ""
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          navigate("/");
          return;
        }

        if (!id) {
          alert("ID no válido");
          navigate("/calificaciones");
          return;
        }

        // Cargar calificación
        const calificacionResp = await fetch(`${appsettings.apiUrl}Calificacion/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Cargar estudiantes
        const estudiantesResp = await fetch(`${appsettings.apiUrl}Estudiante`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Cargar grupos
        const gruposResp = await fetch(`${appsettings.apiUrl}Grupo`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!calificacionResp.ok) {
          throw new Error("Error al cargar la calificación");
        }

        const calificacionData: ICalificacion = await calificacionResp.json();
        
        if (estudiantesResp.ok) {
          const estudiantesData: IEstudiante[] = await estudiantesResp.json();
          setEstudiantes(estudiantesData);
        }
        
        if (gruposResp.ok) {
          const gruposData: IGrupo[] = await gruposResp.json();
          setGrupos(gruposData);
        }
        
        setFormData({
          cod_Calificaion: calificacionData.cod_Calificaion,
          cod_Estudiante: calificacionData.cod_Estudiante?.toString() || "",
          cod_Grupo: calificacionData.cod_Grupo?.toString() || "",
          notaFinal: calificacionData.notaFinal?.toString() || ""
        });
        
      } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar los datos: " + (error instanceof Error ? error.message : "Error desconocido"));
        navigate("/calificaciones");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cargarDatos();
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cod_Estudiante || !formData.cod_Grupo || !formData.notaFinal) {
      alert("Por favor, complete todos los campos");
      return;
    }

    const nota = parseFloat(formData.notaFinal);
    if (isNaN(nota) || nota < 0 || nota > 100) {
      alert("La nota debe ser un número entre 0 y 100");
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`${appsettings.apiUrl}Calificacion/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          cod_Calificaion: formData.cod_Calificaion,
          cod_Estudiante: parseInt(formData.cod_Estudiante),
          cod_Grupo: parseInt(formData.cod_Grupo),
          notaFinal: nota
        })
      });

      if (response.ok) {
        alert("Calificación actualizada correctamente");
        navigate("/calificaciones");
      } else {
        const errorText = await response.text();
        alert(`Error al actualizar: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando datos de la calificación...</div>;
  }

  return (
    <div className="usuarios-page">
      <header className="topbar">
        <div className="logo">
          <h2>UAF</h2>
        </div>
        <nav>
          <ul className="menuhorizontal">
            {/* Vacío */}
          </ul>
        </nav>
      </header>

      <div className="usuarios-header">
        <h2>Editar Calificación</h2>
      </div>
      <hr />

      <div className="form-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Código:
            </label>
            <input
              type="text"
              value={formData.cod_Calificaion}
              disabled
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                backgroundColor: '#f5f6fa',
                color: '#7f8c8d'
              }}
            />
          </div>

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
                  GRP-{grupo.codigoGrupo?.toString().padStart(3, '0') || '000'}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Nota Final (0-100):
            </label>
            <input
              type="number"
              name="notaFinal"
              value={formData.notaFinal}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="100"
              required
              placeholder="Ingrese la nota final"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button
              type="button"
              className="btn delete"
              onClick={() => navigate("/calificaciones")}
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
              {saving ? "Guardando..." : "Actualizar Calificación"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarCalificacion;