import React from "react";
import { useNavigate } from "react-router-dom";

import "../Modalidad.css";
import "../Dashboard.css";
import "../AgregarModalidad.css";

import { ListarModalidad } from "../Components/ListarModalidad";

export function Modalidad() {
  const navigate = useNavigate();

  return (
    <div className="modalidad-page">
      
      <div className="modalidad-header">
        <h2>Gestión de Modalidades</h2>
        <button 
          className="btn add-user" 
          onClick={() => navigate("/Dashboard/nuevamodalidad")} 
        >
          + Agregar Modalidad
        </button>
      </div>
      <hr />

      <div style={{ marginTop: '20px', width: '100%' }}>
        <ListarModalidad />
      </div>

    </div>
  );
}

export default Modalidad;