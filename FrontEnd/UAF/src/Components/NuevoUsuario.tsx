import { ChangeEvent, useState } from "react";
import {appsettings} from "../settings/appsettings";
import { useNavigate } from "react-router-dom";
import { IUsuario } from "../Interfaces/IUsuario";
import { Rol } from "../Interfaces/IRol";

import "../NuevoUsuario.css";
import React, { useEffect } from "react";

const initialUsuario = {
    username:"",
    email:"",
    id_Rol:0,
    estado :"Activo",
    PasswordHash : ""
}


export function NuevoUsuario (){
const [roles, setRoles] = useState<Rol[]>([]);
const [formData, setFormData] = useState({
    username: "",
    email: "",
    id_Rol: 0,
    
    estado: "Activo",
    PasswordHash : ""
  });

   useEffect(() => {
    const cargarRoles = async () => {
      const resp = await fetch(`${appsettings.apiUrl}Rol`);
      const data = await resp.json();
      setRoles(data); // data = [{ idRol:1, nombre:"ADMIN"}, {idRol:2,nombre:"DOCENTE"}, ...]
    };
    cargarRoles();
  }, []);


    const [Usuario,setUsuario] = useState<IUsuario>(initialUsuario);
    const navigate = useNavigate();

    const imputchangevalue = (event : ChangeEvent<HTMLInputElement>)=> {
        const inputName = event.target.name;
        const inputValue = event.target.value;


        setUsuario({...Usuario,[inputName]:inputValue})
        
    }


    const Guardar = async () =>{

          if(!formData.username || !formData.email || !formData.PasswordHash || !formData.id_Rol) {
         alert("Complete todos los campos obligatorios");
         return;
  }

        try {
            const token = localStorage.getItem("token");


             const response = await fetch(`${appsettings.apiUrl}Usuario/NuevoUsuario`,{
                 method : 'POST', headers:{
                 'Content-Type':'application/json',
                 "Authorization": `Bearer ${token}`
            },
            body : JSON.stringify(formData)
        })
        if (response.status === 401) {
      alert("No autorizado. Inicie sesión nuevamente.");
      return;
    }
    if (!response.ok) {
      const errorText = await response.text();
      alert("Error: " + errorText);
      return;
    }
      alert("Usuario creado correctamente");
        
       navigate("/ListarUsuarios")
        
        } catch (error) {
            console.error(error);
          alert("Error de conexión al guardar usuario");
        }
       


    }


    const volver = () =>{
        navigate("/ListarUsuarios")
    }





     const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: name === "id_Rol" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);
    // Aquí luego puedes llamar al backend para guardar el usuario
  };

    return(

        <div>
       <div className="nuevo-usuario-page">
      <div className="form-container">
        <h2>Crear Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingrese username"
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
              placeholder="Ingrese email"
              required
            />
          </div>

          <div className="form-group">
            <label>Rol</label>
            <select name="id_Rol" value={formData.id_Rol} onChange={handleChange} required>
            <option value={0}>Seleccione rol</option>
            {roles.map(r => (
             <option key={r.id_Rol} value={Number(r.id_Rol)}>
              {r.rol}  {/* esto es lo que ve el usuario */}
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
              placeholder="Ingrese password"
              required
            />
          </div>

          <div className="form-group">
            <label>Estado</label>
            <select name="estado" value={formData.estado} onChange={handleChange} required>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn submit" onClick={Guardar}>Guardar Usuario</button>
            <button type="button" className="btn cancel" onClick={volver}>Volver</button>
          </div>
        </form>
      </div>
    </div>

        </div>
        
        
    )
}
export default NuevoUsuario