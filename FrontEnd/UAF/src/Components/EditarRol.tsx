import { ChangeEvent, useState, useEffect } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom";

import "../NuevoUsuario.css";
import React from "react";

export function EditarRol() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
       id_Rol:0,
       estado: "Activo",
       rol: ""
    });

    const navigate = useNavigate();

    // Cargar datos del docente
    useEffect(() => {
        const cargarRol = async () => {
            try {
                const token = localStorage.getItem("token");
                
                if (!token) {
                    alert("No autorizado. Inicie sesión nuevamente.");
                    navigate("/");
                    return;
                }

                // GET: api/Docente
                const response = await fetch(`${appsettings.apiUrl}Rol`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Buscar el docente por ID en la lista
                    const rol = data.find((d: any) => d.id_Rol === parseInt(id!));
                    
                    if (rol) {
                        setFormData({
                            id_Rol: rol.id_Rol,
                            estado: rol.estado,
                            rol: rol.rol
                        });
                    } else {
                        alert("rol no encontrado");
                        navigate("/rol");
                    }
                } else {
                    alert("Error al cargar el rol");
                    navigate("/rol");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error de conexión");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarRol();
        }
    }, [id, navigate]);

    const Guardar = async () => {
        // Validaciones
        if (!formData.rol.trim()) {
            alert("Complete el campo nombre");
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
            const url = `${appsettings.apiUrl}Rol/Editar/${id}`;
            console.log("URL:", url);
            console.log("Datos a enviar:", {
                id_Rol: formData.id_Rol,
               
                estado: formData.estado,
                rol: formData.rol
            });

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_Rol: formData.id_Rol,
               
                 estado: formData.estado,
                 rol: formData.rol
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
                alert("Error 404: Docente no encontrado");
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

            alert("Rol actualizado correctamente");
            navigate("/rol");

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error de conexión al actualizar docente. Verifique que el backend esté corriendo.");
        } finally {
            setSaving(false);
        }
    }

    const volver = () => {
        navigate("/rol");
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
                <div className="loading">Cargando datos del docente...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="nuevo-usuario-page">
                <div className="form-container">
                    <h2>Editar Rol</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Código</label>
                            <input
                                type="text"
                                value={formData.id_Rol}
                                disabled
                                style={{ backgroundColor: '#f5f5f5' }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nombre *</label>
                            <input
                                type="text"
                                name="rol"
                                value={formData.rol}
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

export default EditarRol;