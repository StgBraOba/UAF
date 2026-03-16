import React from "react";
import "../Usuarios.css";
import "../Dashboard.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import "../NuevoUsuario.css";



export function Usuarios () {
    


























    const navigate = useNavigate();
    
    

   const handleAgregarUsuario = () => {
    console.log("Abrir formulario para agregar usuario");
    // Más adelante aquí podrías abrir un modal o navegar a otra ruta
  };
    return(
      <div className="usuarios-page">

       






      <div className="usuarios-header">
        <h2>Gestión de Usuarios</h2>
        <button className="btn add-user" onClick={() => navigate("/NuevoUsuario")}>
          + Agregar Usuario
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
         
          
        </tbody>
      </table>
    </div>

    )
}

export default Usuarios