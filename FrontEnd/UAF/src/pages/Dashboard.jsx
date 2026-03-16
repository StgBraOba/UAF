
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";
import { useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";



function Dashboard() {
  


  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  

  /*let role = "";*/
  useEffect(()=>{ 
  if (token) 
  {
    const decoded = jwtDecode(token);
    setRole (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    setUser (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/name"]||decoded.name);
    console.log(decoded);
  }},[]);

 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };



  return (
   <div className="dashboard">
  
  <aside className="sidebar">
    <div className="logo">
      <h2>UAF</h2>
    </div>
    <ul className="menu">
      <li className="menu-item">Inicio</li>
      
      <li className="menu-item">Reportes</li>
      <li className="menu-item">Nosotros</li>
    </ul>
  </aside>

  
  <div className="main">
   
    <header className="header">
      <div className="welcome">
        <h3>Bienvenido,<span className="role" id="role" >{role}</span></h3>
        
      </div>
      <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
     </header>

  
     <section className="content">
      
      {role === "Admin" &&(<div className="card" onClick={() => navigate("/ListarUsuarios")}>Usuario</div>)}

      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Docentes</div>)}
      {role === "Admin" || role === "Docente" &&(<div className="card" onClick={() => navigate("")}>Estudiantes</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Estudiantes</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Rol</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Facultades</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Carreras</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Asignaturas</div>)}
            {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Modalidad</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Grupo</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Asistencia</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Calificacion</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Inscripcion</div>)}
      
      
     </section>
  </div>
</div>
  );
}

export default Dashboard;