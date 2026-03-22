
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../Usuarios.css";




interface IFacultad  {
  cod_Facultad: 0,
  nombre: "",
  estado: "Activo",
  
  
};

export function NuevoFacultad() {
  const [facultad, setFacultad] = useState<IFacultad[]>([]);
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
          nombre: "",
          estado: "Activo",
          
      });
  
      const navigate = useNavigate();
  
      // Cargar usuarios disponibles
      useEffect(() => {
          const cargarFacultad = async () => {
              try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                      navigate("/");
                      return;
                  }
  
                  const response = await fetch(`${appsettings.apiUrl}Facultad`, {
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json"
                      }
                  });
  
                  if (response.ok) {
                      const data = await response.json();
                      setFacultad(data);
                      console.log("Facultades cargadas:", data);
                  } else {
                      console.error("Error al cargar usuarios:", response.status);
                  }
              } catch (error) {
                  console.error("Error al cargar facultades:", error);
              }
          };
          cargarFacultad();
      }, [navigate]);
  
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
      };
  
      const Guardar = async () => {
          // Validaciones
          if (!formData.nombre.trim()) {
              alert("Complete el campo nombre");
              return;
          }
          if (!formData.estado.trim()) {
              alert("Complete el campo estado");
              return;
          }
          
        
  
          setLoading(true);
  
          try {
              const token = localStorage.getItem("token");
              
              if (!token) {
                  alert("No autorizado. Inicie sesión nuevamente.");
                  navigate("/");
                  return;
              }
  
              const datosEnviar = {
                  nombre: formData.nombre.trim(),
                  estado: formData.estado,
                  
              };
  
              // 🔴 CORRECCIÓN IMPORTANTE: La URL debe ser /Carrera/NuevaCarrera
              const url = `${appsettings.apiUrl}Facultad/NuevaFacultad`;
              console.log("URL:", url);
              console.log("Datos a enviar:", datosEnviar);
  
              const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(datosEnviar)
              });
  
              console.log("Status:", response.status);
  
              if (response.status === 401) {
                  alert("No autorizado. Inicie sesión nuevamente.");
                  localStorage.removeItem("token");
                  navigate("/");
                  return;
              }
  
              if (response.status === 404) {
                  alert("Error 404: Endpoint no encontrado. Verifique la URL: " + url);
                  console.error("URL no encontrada:", url);
                  return;
              }
  
              if (response.status === 201) {
                  alert("Facultad creada correctamente");
                  navigate("/Facultad");
                  return;
              }
  
              if (!response.ok) {
                  const errorText = await response.text();
                  console.error("Error completo:", errorText);
                  alert(`Error ${response.status}: ${errorText || "Error desconocido"}`);
                  return;
              }
  
              const result = await response.json();
              console.log("Facultad creada:", result);
              
              alert("Facultad creada correctamente");
              navigate("/Facultad");
  
          } catch (error) {
              console.error("Error de conexión:", error);
              alert("Error de conexión con el servidor. Verifique que el backend esté corriendo en " + appsettings.apiUrl);
          } finally {
              setLoading(false);
          }
      }
  
      const volver = () => {
          navigate("/Facultad");
      }
  
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          Guardar();
      };

  return (
     <div>
            <div className="nuevo-usuario-page">
                <div className="form-container">
                    <h2>Agregar Facultad</h2>
                    <form onSubmit={handleSubmit}>
                       <div className="form-group">
                            <label>Nombre Facultad</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ingrese nombre"
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>Estado</label>
                            <select 
                                name="estado" 
                                value={formData.estado} 
                                onChange={handleChange}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className="btn submit" 
                                
                            >
                                {loading ? "Guardando..." : "Guardar Facultades"}
                            </button>
                            <button 
                                type="button" 
                                className="btn cancel" 
                                onClick={volver}
                            >
                                Volver
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default NuevoFacultad;