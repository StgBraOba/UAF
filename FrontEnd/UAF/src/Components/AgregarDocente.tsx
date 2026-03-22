import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../NuevoUsuario.css";

interface IUsuario {
    id_Usuario: number;
    username: string;
    email: string;
}

export function AgregarDocente() {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        direccion: "",
        estado: "Activo",
        id_Usuario: ""
    });

    const navigate = useNavigate();

    // Cargar usuarios disponibles
    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await fetch(`${appsettings.apiUrl}Usuario`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data);
                    console.log("Usuarios cargados:", data);
                } else {
                    console.error("Error al cargar usuarios:", response.status);
                }
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            }
        };
        cargarUsuarios();
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
        if (!formData.id_Usuario) {
            alert("Seleccione un usuario");
            return;
        }

        const edad = parseInt(formData.edad);
        if (isNaN(edad) || edad < 18 || edad > 100) {
            alert("La edad debe ser un número entre 18 y 100");
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
                apellido: formData.apellido.trim(),
                edad: edad,
                direccion: formData.direccion.trim(),
                estado: formData.estado,
                id_Usuario: parseInt(formData.id_Usuario)
            };

            // 🔴 CORRECCIÓN IMPORTANTE: La URL debe ser /Docente/NuevoDocente
            const url = `${appsettings.apiUrl}Docente/NuevoDocente`;
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
                alert("Docente creado correctamente");
                navigate("/docentes");
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error completo:", errorText);
                alert(`Error ${response.status}: ${errorText || "Error desconocido"}`);
                return;
            }

            const result = await response.json();
            console.log("Docente creado:", result);
            
            alert("Docente creado correctamente");
            navigate("/docentes");

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error de conexión con el servidor. Verifique que el backend esté corriendo en " + appsettings.apiUrl);
        } finally {
            setLoading(false);
        }
    }

    const volver = () => {
        navigate("/docentes");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Guardar();
    };

    return (
        <div>
            <div className="nuevo-usuario-page">
                <div className="form-container">
                    <h2>Agregar Nuevo Docente</h2>
                    <form onSubmit={handleSubmit}>
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
                            <label>Usuario *</label>
                            <select 
                                name="id_Usuario" 
                                value={formData.id_Usuario} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Seleccione un usuario</option>
                                {usuarios.map(u => (
                                    <option key={u.id_Usuario} value={Number(u.id_Usuario)}>
                                        {u.username} - {u.email}
                                    </option>
                                ))}
                            </select>
                            {usuarios.length === 0 && (
                                <small style={{ color: '#e84118', display: 'block', marginTop: '5px' }}>
                                    No hay usuarios disponibles. Cree un usuario primero.
                                </small>
                            )}
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
                                disabled={loading || usuarios.length === 0}
                            >
                                {loading ? "Guardando..." : "Guardar Docente"}
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

export default AgregarDocente;