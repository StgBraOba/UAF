import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../Estudiantes.css";

interface IGrupo {
    cod_Grupo: number;
    cod_Inscripcion: number;
    cod_Docente: number;
    cupo: number;
    estado: string;
    codigoGrupo: number;
}

export function EditarGrupo() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cod_Grupo: 0,
    cod_Inscripcion: "",
    cod_Docente: "",
    cupo: "",
    estado: "Activo",
    codigoGrupo: ""
  });

  useEffect(() => {
    const cargarGrupo = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          navigate("/");
          return;
        }

        if (!id) {
          alert("ID de grupo no válido");
          navigate("/grupos");
          return;
        }
        
        const response = await fetch(`${appsettings.apiUrl}Grupo/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data: IGrupo = await response.json();
          console.log("Grupo cargado:", data);
          
          setFormData({
            cod_Grupo: data.cod_Grupo,
            cod_Inscripcion: data.cod_Inscripcion.toString(),
            cod_Docente: data.cod_Docente.toString(),
            cupo: data.cupo.toString(),
            estado: data.estado,
            codigoGrupo: data.codigoGrupo.toString()
          });
        } else {
          alert("Error al cargar el grupo");
          navigate("/grupos");
        }
      } catch (error) {
        console.error("Error al cargar grupo:", error);
        alert("Error al cargar los datos");
        navigate("/grupos");
      } finally {
        setLoading(false);
      }
    };

    cargarGrupo();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        cod_Grupo: formData.cod_Grupo,
        cod_Inscripcion: parseInt(formData.cod_Inscripcion),
        cod_Docente: parseInt(formData.cod_Docente),
        cupo: parseInt(formData.cupo),
        estado: formData.estado,
        codigoGrupo: parseInt(formData.codigoGrupo)
      };

      console.log("Actualizando datos:", grupoData);

      const response = await fetch(`${appsettings.apiUrl}Grupo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(grupoData)
      });

      if (response.ok) {
        alert("Grupo actualizado correctamente");
        navigate("/grupos");
      } else {
        const errorText = await response.text();
        alert(`Error al actualizar grupo: ${response.status} - ${errorText || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando datos del grupo...</div>;
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
        <h2>Editar Grupo</h2>
      </div>
      <hr />

      <div className="form-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Mostrar ID (solo lectura) */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2f3640' }}>
              Código:
            </label>
            <input
              type="text"
              value={formData.cod_Grupo}
              readOnly
              disabled
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #dcdde1',
                fontSize: '16px',
                backgroundColor: '#f5f6fa',
                color: '#7f8c8d'
              }}
            />
          </div>

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
              {saving ? "Guardando..." : "Actualizar Grupo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarGrupo;