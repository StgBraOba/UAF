import { ChangeEvent, useState, useEffect } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom";

import "../NuevoUsuario.css";
import React from "react";

export function EditarModalidad()
{ 
 const { id } = useParams();
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [formData, setFormData] = useState({
 cod_Modalidad:0,
 estado: "Activo",
  modalidad: ""
 });

    const navigate = useNavigate();

    // Cargar datos de Modalidad
    useEffect(() => {
        const cargarModalidad = async () => {
            try {
                const token = localStorage.getItem("token");
                
                if (!token) {
                    alert("No autorizado. Inicie sesión nuevamente.");
                    navigate("/");
                    return;
                }

                // GET: api/modalidad
                const response = await fetch(`${appsettings.apiUrl}Modalidad`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Buscar el carrera por ID en la lista
                    const modalidad = data.find((d: any) => d.cod_Modalidad === parseInt(id!));
                    
                    if (modalidad) {
                        setFormData({
                            cod_Modalidad: modalidad.cod_Modalidad,
                            estado: modalidad.estado,
                            modalidad: modalidad.modalidad
                        });
                    } else {
                        alert("Modalidad no encontrado");
                        navigate("/Modalidad");
                    }
                } else {
                    alert("Error al cargar las modalidades");
                    navigate("/Modalidad");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error de conexión");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarModalidad();
        }
    }, [id, navigate]);

    const Guardar = async () => {
        // Validaciones
        if (!formData.modalidad.trim()) {
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
            const url = `${appsettings.apiUrl}Modalidad/Editar/${id}`;
            console.log("URL:", url);
            console.log("Datos a enviar:", {
                cod_Modalidad: formData.cod_Modalidad,
                estado: formData.estado,
                modalidad: formData.modalidad.trim()
            });

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                 cod_Modalidad: formData.cod_Modalidad,
                  modalidad: formData.modalidad.trim(),
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

            alert("Modalidad actualizado correctamente");
            navigate("/Modalidad");

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error de conexión al actualizar docente. Verifique que el backend esté corriendo.");
        } finally {
            setSaving(false);
        }
    }

    const volver = () => {
        navigate("/Modalidad");
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
                <div className="loading">Cargando datos de la modalidad...</div>
            </div>
        );
    }
    return (
        <div>
            <div className="nuevo-usuario-page">
                <div className="form-container">
                    <h2>Editar Carrera</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Código</label>
                            <input
                                type="text"
                                value={formData.cod_Modalidad}
                                disabled
                                style={{ backgroundColor: '#f5f5f5' }}
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

                        <div className="form-group">
                            <label>Nombre *</label>
                            <input
                                type="text"
                                name="modalidad"
                                value={formData.modalidad}
                                onChange={handleChange}
                                placeholder="Ingrese nombre"
                                required
                            />
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
export default EditarModalidad;