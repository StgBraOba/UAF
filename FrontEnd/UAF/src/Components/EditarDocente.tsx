import { ChangeEvent, useState, useEffect } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom";

import "../NuevoUsuario.css";
import React from "react";

export function EditarDocente() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        cod_Docente: 0,
        nombre: "",
        apellido: "",
        edad: "",
        direccion: "",
        estado: "Activo",
        id_Usuario: ""
    });

    const navigate = useNavigate();

    // Cargar datos del docente
    useEffect(() => {
        const cargarDocente = async () => {
            try {
                const token = localStorage.getItem("token");
                
                if (!token) {
                    alert("No autorizado. Inicie sesión nuevamente.");
                    navigate("/");
                    return;
                }

                // GET: api/Docente
                const response = await fetch(`${appsettings.apiUrl}Docente`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Buscar el docente por ID en la lista
                    const docente = data.find((d: any) => d.cod_Docente === parseInt(id!));
                    
                    if (docente) {
                        setFormData({
                            cod_Docente: docente.cod_Docente,
                            nombre: docente.nombre,
                            apellido: docente.apellido,
                            edad: docente.edad.toString(),
                            direccion: docente.direccion,
                            estado: docente.estado,
                            id_Usuario: docente.id_Usuario.toString()
                        });
                    } else {
                        alert("Docente no encontrado");
                        navigate("/docentes");
                    }
                } else {
                    alert("Error al cargar el docente");
                    navigate("/docentes");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error de conexión");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarDocente();
        }
    }, [id, navigate]);

    const Guardar = async () => {
        // Validaciones
        if (!formData.nombre.trim()) {
            alert("Complete el campo nombre");
            return;
        }
        if (!formData.apellido.trim()) {
            alert("Complete el campo apellido");
            return;
        }
        if (!formData.edad) {
            alert("Complete el campo edad");
            return;
        }
        if (!formData.direccion.trim()) {
            alert("Complete el campo dirección");
            return;
        }

        const edad = parseInt(formData.edad);
        if (isNaN(edad) || edad < 18 || edad > 100) {
            alert("La edad debe ser un número entre 18 y 100");
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
            const url = `${appsettings.apiUrl}Docente/Editar/${id}`;
            console.log("URL:", url);
            console.log("Datos a enviar:", {
                cod_Docente: formData.cod_Docente,
                nombre: formData.nombre.trim(),
                apellido: formData.apellido.trim(),
                edad: edad,
                direccion: formData.direccion.trim(),
                estado: formData.estado,
                id_Usuario: parseInt(formData.id_Usuario)
            });

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    cod_Docente: formData.cod_Docente,
                    nombre: formData.nombre.trim(),
                    apellido: formData.apellido.trim(),
                    edad: edad,
                    direccion: formData.direccion.trim(),
                    estado: formData.estado,
                    id_Usuario: parseInt(formData.id_Usuario)
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

            alert("Docente actualizado correctamente");
            navigate("/docentes");

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error de conexión al actualizar docente. Verifique que el backend esté corriendo.");
        } finally {
            setSaving(false);
        }
    }

    const volver = () => {
        navigate("/docentes");
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
                    <h2>Editar Docente</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Código</label>
                            <input
                                type="text"
                                value={formData.cod_Docente}
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
                            <label>Apellido *</label>
                            <input
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                placeholder="Ingrese apellido"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Edad *</label>
                            <input
                                type="number"
                                name="edad"
                                value={formData.edad}
                                onChange={handleChange}
                                placeholder="Ingrese edad (18-100)"
                                min="18"
                                max="100"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Dirección *</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                placeholder="Ingrese dirección"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>ID Usuario</label>
                            <input
                                type="text"
                                value={formData.id_Usuario}
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

export default EditarDocente;