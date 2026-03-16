import React from "react";
import "../Usuarios.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../NuevoUsuario.css";
import { Rol } from "../Interfaces/IRol";
import {IUsuario} from "../Interfaces/IUsuario";

export function ListarUsuarios () 
{



  const [usuario,setUsuarios] = useState<IUsuario[]>([]);


  const { id } = useParams();

      

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

      // Cargar usuarios
     
     useEffect(() => {
     const obtenerUsuarios = async () => {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${appsettings.apiUrl}Usuario`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
          const data = await response.json();

         
      setUsuarios(data);
  
      }};

      obtenerUsuarios();
     }, [id]);


     

     const Eliminar = async (id: number) => {
       const token = localStorage.getItem("token");

       const response = await fetch(
       `${appsettings.apiUrl}Usuario/Eliminar/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if(response.ok){
    alert("Usuario eliminado correctamente");
    window.location.reload();
  }
 }


























     const navigate = useNavigate();
    
    

   const handleAgregarUsuario = () => {
    console.log("Abrir formulario para agregar usuario");
    // Más adelante aquí podrías abrir un modal o navegar a otra ruta
  };
    return(

      
      <div className="usuarios-page">
         {/* MENU SUPERIOR */}
  <header className="topbar">
    <div className="logo">
      <h2>UAF</h2>
    </div>

    <nav>
      <ul className="menuhorizontal">
        <li className="menuhorizontal-item" onClick={() => navigate("/dashboard")}>Inicio</li>
        <li className="menuhorizontal-item">Reportes</li>
        <li className="menuhorizontal-item">Nosotros</li>
      </ul>
    </nav>
  </header>
        
      <div className="usuarios-header">
        <h2>Gestión de Usuarios</h2>
        <button className="btn add-user" onClick={() => navigate("/NuevoUsuario")}>
          + Agregar Usuario +
        </button>
      </div>
      <hr />

      <table className="usuarios-table">

         
        <thead>
          <tr>
            <th>Id Usuario</th>
            <th>Username</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
         
            {usuario.map((usuario) => (
            <tr key={usuario.id_Usuario}>
              <td>{usuario.id_Usuario}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>{usuario.id_Rol}</td>
              <td>{usuario.estado}</td>
              <td>
                <button className="btn edit" onClick={() => navigate(`/Editarusuario/${usuario.id_Usuario}`)} >Editar</button>
                <button className="btn delete" onClick={() => Eliminar(usuario.id_Usuario!)} >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    )
}

export default ListarUsuarios