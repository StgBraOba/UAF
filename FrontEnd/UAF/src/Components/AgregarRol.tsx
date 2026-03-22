import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../NuevoUsuario.css";

interface Rol {
    id_Rol: number;
    estado: string;
    rol: string;
}

export function AgregarRol() {
    const [roles, setRoles] = useState<Rol[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        estado: "Activo",
        rol: ""
        
    });

    const navigate = useNavigate();

    // Cargar usuarios disponibles
    useEffect(() => {
        const cargarRoles = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await fetch(`${appsettings.apiUrl}Rol`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setRoles(data);
                    console.log("Roles cargados:", data);
                } else {
                    console.error("Error al cargar Roles:", response.status);
                }
            } catch (error) {
                console.error("Error al cargar Roles:", error);
            }
        };
        cargarRoles();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const Guardar = async () => {
        // Validaciones
        if (!formData.rol.trim()) {
            alert("Complete el campo nombre");
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
                
                estado: formData.estado,
                rol: formData.rol.trim()
            };

            // 🔴 CORRECCIÓN IMPORTANTE: La URL debe ser /Docente/NuevoDocente
            const url = `${appsettings.apiUrl}Rol/NuevoRol`;
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
                navigate("/rol");
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error completo:", errorText);
                alert(`Error ${response.status}: ${errorText || "Error desconocido"}`);
                return;
            }

            const result = await response.json();
            console.log("Rol creado:", result);
            
            alert("Rol creado correctamente");
            navigate("/rol");

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error de conexión con el servidor. Verifique que el backend esté corriendo en " + appsettings.apiUrl);
        } finally {
            setLoading(false);
        }
    }

    const volver = () => {
        navigate("/rol");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Guardar();
    };

    return (
        <div>
            <div className="nuevo-usuario-page">
                <div className="form-container">
                    <h2>Agregar Nuevo Rol</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Rol</label>
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
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className="btn submit" 
                                disabled={loading || roles.length === 0}
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

export default AgregarRol;