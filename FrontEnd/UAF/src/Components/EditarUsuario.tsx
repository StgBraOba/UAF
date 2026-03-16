import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../NuevoUsuario.css";
import { Rol } from "../Interfaces/IRol";
import { IUsuario } from "../Interfaces/IUsuario";

export function EditarUsuario() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Rol[]>([]);

  const [formData, setFormData] = useState<IUsuario>({
    id_Usuario: 0,
    username: "",
    email: "",
    id_Rol: 0,
    PasswordHash: "",
    estado: "Activo"
  });

  // Cargar roles
  useEffect(() => {
    const cargarRoles = async () => {
      const resp = await fetch(`${appsettings.apiUrl}Rol`);
      const data = await resp.json();
      setRoles(data);
    };

    cargarRoles();
  }, []);

  // Cargar usuario a editar
  useEffect(() => {
    const obtenerUsuario = async () => {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${appsettings.apiUrl}Usuario/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();

         setFormData({
         id_Usuario: data.id_Usuario,
         username: data.username,
         email: data.email,
         id_Rol: data.id_Rol,
         PasswordHash: "",
         estado: data.estado
      });

         
        }
    };

    obtenerUsuario();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "id_Rol" ? Number(value) : value
    });
  };

  const guardar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.id_Rol) {
      alert("Complete todos los campos obligatorios");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${appsettings.apiUrl}Usuario/Editar/${formData.id_Usuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 401) {
        alert("No autorizado");
        return;
      }

      if (!response.ok) {
        const error = await response.text();
        alert(error);
        return;
      }

      alert("Usuario actualizado correctamente");
      navigate("/ListarUsuarios");

    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="nuevo-usuario-page">
      <div className="form-container">
        <h2>Editar Usuario</h2>

        <form onSubmit={guardar}>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Rol</label>
            <select
              name="id_Rol"
              value={formData.id_Rol}
              onChange={handleChange}
              required
            >
              <option value={0}>Seleccione rol</option>

              {roles.map((r) => (
                <option key={r.id_Rol} value={r.id_Rol}>
                  {r.rol}
                </option>
              ))}

            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="PasswordHash"
              value={formData.PasswordHash}
              onChange={handleChange}
              placeholder="Nueva contraseña"
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
            <button type="submit" className="btn submit">
              Guardar
            </button>

            <button
              type="button"
              className="btn cancel"
              onClick={() => navigate("/ListarUsuarios")}
            >
              Volver
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditarUsuario;