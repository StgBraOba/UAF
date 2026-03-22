import { useNavigate } from "react-router-dom";
import "../Dashboard.css";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


function Reportes()
{
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
      <li className="menu-item" onClick={() => navigate("/Dashboard")}>Inicio</li>
       {role === "Admin" &&(<li className="menu-item" onClick={() => navigate("/Reportes")}>Reportes</li>)}
      
      <li className="menu-item">Nosotros</li>
    </ul>
  </aside>

  
  <div className="main">
   
    <header className="header">
      <div className="welcome">
        <h3>Dashboard Reportes<span className="role" id="role" >{role}</span></h3>
        
      </div>
      <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
     </header>

  
     <section className="content">
      
      {role === "Admin" &&(<div className="card" onClick={() => navigate("/ReporteUsuarios")}>Usuario</div>)}

      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Docentes</div>)}
      
      {role === "Admin" &&(<div className="card" onClick={() => navigate("/ReporteEstudiantes")}>Estudiantes</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Rol</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Facultades</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Carreras</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Asignaturas</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Modalidad</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Grupo</div>)}
      {role === "Admin"  &&(<div className="card" onClick={() => navigate("")}>Asistencia</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Calificacion</div>)}
      {role === "Admin" &&(<div className="card" onClick={() => navigate("")}>Inscripcion</div>)}
      
      {/* Botones para Docente */}
          {role === "Docente" && (
            <>
              <div className="card" onClick={() => navigate("/estudiantes")}>Estudiantes</div>
              <div className="card" onClick={() => navigate("/calificaciones")}>Calificacion</div>
              <div className="card" onClick={() => navigate("/asistencia")}>Asistencia</div>
            </>
          )}
     </section>
  </div>
</div>
  );

}
export default Reportes;