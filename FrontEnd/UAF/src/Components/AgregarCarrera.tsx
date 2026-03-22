import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../NuevoUsuario.css";

interface IFacultad {
    cod_Facultad: number;
    estado: string;
    nombre: string;
}

export function AgregarCarrera() {
    const [facultades, setFacultades] = useState<IFacultad[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombreCarrera: "",
        estado: "Activo",
        cod_facultad: ""
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
                    setFacultades(data);
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
        if (!formData.nombreCarrera.trim()) {
            alert("Complete el campo nombre");
            return;
        }
        if (!formData.estado.trim()) {
            alert("Complete el campo estado");
            return;
        }
        if (!formData.cod_facultad) {
            alert("Complete el campo Facultad");
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
                nombreCarrera: formData.nombreCarrera.trim(),
                estado: formData.estado,
                cod_facultad: parseInt(formData.cod_facultad)
            };

            // 🔴 CORRECCIÓN IMPORTANTE: La URL debe ser /Carrera/NuevaCarrera
            const url = `${appsettings.apiUrl}Carrera/NuevaCarrera`;
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
                alert("Carrera creada correctamente");
                navigate("/Carreras");
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error completo:", errorText);
                alert(`Error ${response.status}: ${errorText || "Error desconocido"}`);
                return;
            }

            const result = await response.json();
            console.log("Carrera creada:", result);
            
            alert("Carrera creada correctamente");
            navigate("/Carreras");

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error de conexión con el servidor. Verifique que el backend esté corriendo en " + appsettings.apiUrl);
        } finally {
            setLoading(false);
        }
    }

    const volver = () => {
        navigate("/Carreras");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Guardar();
    };

    return (
        <div>
            <div className="nuevo-usuario-page">
                <div className="form-container">
                    <h2>Agregar Carrera</h2>
                    <form onSubmit={handleSubmit}>
                       <div className="form-group">
                            <label>Nombre Carrera</label>
                            <input
                                type="text"
                                name="nombreCarrera"
                                value={formData.nombreCarrera}
                                onChange={handleChange}
                                placeholder="Ingrese nombre"
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>Facultad</label>
                            <select 
                                name="cod_facultad" 
                                value={formData.cod_facultad} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Seleccione una facultad</option>
                                {facultades.map(u => (
                                    <option key={u.cod_Facultad} value={Number(u.cod_Facultad)}>
                                        {u.nombre}
                                    </option>
                                ))}
                            </select>
                            {facultades.length === 0 && (
                                <small style={{ color: '#e84118', display: 'block', marginTop: '5px' }}>
                                    No hay facultaded disponibles. Cree una facultad primero.
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
                                disabled={loading || facultades.length === 0}
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

export default AgregarCarrera;