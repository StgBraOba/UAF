import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../Usuarios.css";
import { IFacultad } from "../Interfaces/IFacultad";


export function EditarFacultad() {
 const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
  cod_Facultad:0,
  nombre: "",
  estado: "Activo",
  });
 
     const navigate = useNavigate();
 
     // Cargar datos de carrera
     useEffect(() => {
         const cargarCarrera = async () => {
             try {
                 const token = localStorage.getItem("token");
                 
                 if (!token) {
                     alert("No autorizado. Inicie sesión nuevamente.");
                     navigate("/");
                     return;
                 }
 
                 // GET: api/Carrera
                 const response = await fetch(`${appsettings.apiUrl}Facultad`, {
                     headers: {
                         Authorization: `Bearer ${token}`,
                         "Content-Type": "application/json"
                     }
                 });
 
                 if (response.ok) {
                     const data = await response.json();
                     // Buscar el carrera por ID en la lista
                     const Facultad = data.find((d: any) => d.cod_Facultad === parseInt(id!));
                     
                     if (Facultad) {
                         setFormData({
                             cod_Facultad: Facultad.cod_Facultad,
                             nombre: Facultad.nombre,
                             estado: Facultad.estado,
                             
                         });
                     } else {
                         alert("Facultad no encontrado");
                         navigate("/Facultad");
                     }
                 } else {
                     alert("Error al cargar las carreras");
                     navigate("/Facultad");
                 }
             } catch (error) {
                 console.error("Error:", error);
                 alert("Error de conexión");
             } finally {
                 setLoading(false);
             }
         };
 
         if (id) {
             cargarCarrera();
         }
     }, [id, navigate]);
 
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
         
        
 
 
         setSaving(true);
 
         try {
             const token = localStorage.getItem("token");
             
             if (!token) {
                 alert("No autorizado. Inicie sesión nuevamente.");
                 navigate("/");
                 return;
             }
 
             // PUT: api/Docente/Editar/{id}
             const url = `${appsettings.apiUrl}Facultad/Editar/${id}`;
             console.log("URL:", url);
             console.log("Datos a enviar:", {
                 cod_Facultad: formData.cod_Facultad,
                 nombre: formData.nombre.trim(),
                 estado: formData.estado
                
             });
 
             const response = await fetch(url, {
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json',
                     "Authorization": `Bearer ${token}`
                 },
                 body: JSON.stringify({
                  cod_Facultad: formData.cod_Facultad,
                 nombre: formData.nombre.trim(),
                 estado: formData.estado
                 })
             });
 
             console.log("Status:", response.status);
 
             if (response.status === 401) {
                 alert("No autorizado. Inicie sesión nuevamente.");
                 localStorage.removeItem("token");
                 navigate("/");
                 return;
             }
 
             if (response.status === 404) {
                 alert("Error 404: Carrera no encontrado");
                 return;
             }
 
             if (response.status === 400) {
                 const errorText = await response.text();
                 console.error("Error 400:", errorText);
                 alert("Error en los datos enviados: " + errorText);
                 return;
             }
 
             if (!response.ok) {
                 const errorText = await response.text();
                 console.error("Error:", errorText);
                 alert(`Error ${response.status}: ${errorText || "Error desconocido"}`);
                 return;
             }
 
             alert("Facultad actualizado correctamente");
             navigate("/Facultad");
 
         } catch (error) {
             console.error("Error de conexión:", error);
             alert("Error de conexión al actualizar docente. Verifique que el backend esté corriendo.");
         } finally {
             setSaving(false);
         }
     }
 
     const volver = () => {
         navigate("/Facultad");
     }
 
     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
         const { name, value } = e.target;
         setFormData({ ...formData, [name]: value });
     };
 
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         Guardar();
     };
 
     if (loading) {
         return (
             <div className="loading-container">
                 <div className="loading">Cargando datos de la carrera...</div>
             </div>
         );
     }

  return (
    <div>
            <div className="nuevo-usuario-page">
                <div className="form-container">
                    <h2>Editar Facultad</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Código</label>
                            <input
                                type="text"
                                value={formData.cod_Facultad}
                                disabled
                                style={{ backgroundColor: '#f5f5f5' }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nombre *</label>
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
                                required
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className="btn submit" 
                                disabled={saving}
                            >
                                {saving ? "Guardando..." : "Actualizar Docente"}
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

export default EditarFacultad;