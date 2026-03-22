import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reportes from "./pages/Reportes";
import Usuarios from "./pages/Usuario";
import { NuevoUsuario } from "./Components/NuevoUsuario";
import { EditarUsuario } from "./Components/EditarUsuario";
import { ListarUsuarios } from "./Components/ListarUsuario";
import { ListarEstudiantes } from "./Components/ListarEstudiantes";

// Importar componentes de Calificaciones
import { ListarCalificaciones } from "./Components/ListarCalificaciones";
import { AgregarCalificacion } from "./Components/AgregarCalificacion";
import { EditarCalificacion } from "./Components/EditarCalificacion";

// Importar componentes de Grupos
import { ListarGrupos } from "./Components/ListarGrupos";
import { AgregarGrupo } from "./Components/AgregarGrupo";
import { EditarGrupo } from "./Components/EditarGrupo";

// Importar componentes de Asistencia
import { ListarAsistencia } from "./Components/ListarAsistencia";
import { AgregarAsistencia } from "./Components/AgregarAsistencia";
import { EditarAsistencia } from "./Components/EditarAsistencia";

// Importar componentes de Docentes
import { ListarDocentes } from "./Components/ListarDocentes";
import { AgregarDocente } from "./Components/AgregarDocente";
import { EditarDocente } from "./Components/EditarDocente";

// Importar componentes de Carrera
import AgregarCarrera from "./Components/AgregarCarrera";
import ListarCarrera from "./Components/ListarCarrera";
import EditarCarrera from "./Components/EditarCarrera";

// Importar componentes de Modalidad
import NuevaModalidad from "./Components/NuevaModalidad";
import ListarModalidad from "./Components/ListarModalidad";
import EditarModalidad from "./Components/EditarModalidad";


//Importar componentes de Facultad
import NuevoFacultad from "./Components/NuevoFacultad";
import EditarFacultad from "./Components/EditarFacultad";
import ListarFacultades from "./Components/ListarFacultad";


//Importar componentes de Roles
import AgregarRol from "./Components/AgregarRol";
import EditarRol from "./Components/EditarRol";
import ListarRol from "./Components/ListarRol";

//Importar Reportes
import { ReporteEstudiantes } from "./Components/ReporteEstudiantes";
import { ReporteUsuarios } from "./Components/ReportesUsuarios";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Login />;
}

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route
        path="/Dashboard"
        element={
          <PrivateRoute>
          <Dashboard />
          </PrivateRoute>
        }/>
      /*Para Reportes */
      <Route
          path="/Reportes"
          element={
            <PrivateRoute>
              <Reportes />
            </PrivateRoute>
          }
        />

      <Route
          path="/ReporteEstudiantes"
          element={
            <PrivateRoute>
              <ReporteEstudiantes />
            </PrivateRoute>
          }
        />

        <Route
          path="/ReporteUsuarios"
          element={
            <PrivateRoute>
              <ReporteUsuarios />
            </PrivateRoute>
          }
        />

    /*Para usuario */
    <Route path="/usuarios" element={<Usuarios />} />
    <Route path="/nuevousuario" element={<NuevoUsuario />} />
    <Route path="/editarusuario/:id" element={<EditarUsuario />} />
      <Route path="/listarusuarios" element={<ListarUsuarios />} />

      {/* ========== RUTAS DE ESTUDIANTES ========== */}
        <Route
          path="/estudiantes"
          element={
            <PrivateRoute>
              <ListarEstudiantes />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/agregar-estudiante"
          element={
            <PrivateRoute>
              <div className="construccion">
                <h2>Agregar Estudiante</h2>
                <p>Esta página está en construcción</p>
                <button onClick={() => window.history.back()}>Volver</button>
              </div>
            </PrivateRoute>
          }
        />
        
        <Route
          path="/editar-estudiante/:id"
          element={
            <PrivateRoute>
              <div className="construccion">
                <h2>Editar Estudiante</h2>
                <p>Esta página está en construcción</p>
                <button onClick={() => window.history.back()}>Volver</button>
              </div>
            </PrivateRoute>
          }
        />
        
        {/* ========== RUTAS DE CALIFICACIONES ========== */}
        <Route
          path="/calificaciones"
          element={
            <PrivateRoute>
              <ListarCalificaciones />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/agregar-calificacion"
          element={
            <PrivateRoute>
              <AgregarCalificacion />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/editar-calificacion/:id"
          element={
            <PrivateRoute>
              <EditarCalificacion />
            </PrivateRoute>
          }
        />
        
        {/* ========== RUTAS DE GRUPOS ========== */}
        <Route
          path="/grupos"
          element={
            <PrivateRoute>
              <ListarGrupos />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/agregar-grupo"
          element={
            <PrivateRoute>
              <AgregarGrupo />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/editar-grupo/:id"
          element={
            <PrivateRoute>
              <EditarGrupo />
            </PrivateRoute>
          }
        />
        
        {/* ========== RUTAS DE ASISTENCIA ========== */}
        <Route
          path="/asistencia"
          element={
            <PrivateRoute>
              <ListarAsistencia />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/agregar-asistencia"
          element={
            <PrivateRoute>
              <AgregarAsistencia />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/editar-asistencia/:id"
          element={
            <PrivateRoute>
              <EditarAsistencia />
            </PrivateRoute>
          }
        />
        
        {/* ========== RUTAS DE DOCENTES ========== */}
        <Route
          path="/docentes"
          element={
            <PrivateRoute>
              <ListarDocentes />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/agregar-docente"
          element={
            <PrivateRoute>
              <AgregarDocente />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/editar-docente/:id"
          element={
            <PrivateRoute>
              <EditarDocente />
            </PrivateRoute>
          }
        />
        
        {/* ========== RUTAS DE ROLES ========== */}
      <Route
          path="/rol"
          element={
            <PrivateRoute>
              <ListarRol />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/agregar-rol"
          element={
            <PrivateRoute>
              <AgregarRol />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/editar-rol/:id"
          element={
            <PrivateRoute>
              <EditarRol />
            </PrivateRoute>
          }
        />
        
                {/* ========== RUTAS DE FACULTADES ========== */}
              /*Para facultad */
            
        <Route path="/NuevoFacultad" element={<PrivateRoute><NuevoFacultad /></PrivateRoute>} />
        <Route path="/EditarFacultad/:id" element={<PrivateRoute><EditarFacultad /></PrivateRoute>} />
        <Route path="/Facultad" element={<PrivateRoute><ListarFacultades /></PrivateRoute>} />
                
        {/* ========== RUTAS DE CARRERAS ========== */}
        <Route
          path="/Carreras"
          element={
            <PrivateRoute>
              <ListarCarrera />
            </PrivateRoute>
          }
        />

        <Route
          path="/agregar-carrera"
          element={
            <PrivateRoute>
              <AgregarCarrera />
            </PrivateRoute>
          }
        />

        <Route
          path="/editar-carrera/:id"
          element={
            <PrivateRoute>
              <EditarCarrera />
            </PrivateRoute>
          }
        />
        
        {/* ========== RUTAS DE ASIGNATURAS ========== */}
        <Route
          path="/asignaturas"
          element={
            <PrivateRoute>
              <div className="construccion">
                <h2>Módulo de Asignaturas</h2>
                <p>Esta página está en construcción</p>
                <button onClick={() => window.history.back()}>Volver</button>
              </div>
            </PrivateRoute>
          }
        />
        
            {/* ========== RUTAS DE MODALIDADES ========== */}
          <Route
              path="/modalidad"
              element={
                <PrivateRoute>
                  <ListarModalidad />
                </PrivateRoute>
              }
            />

            <Route
              path="/agregar-modalidad"
              element={
                <PrivateRoute>
                  <NuevaModalidad />
                </PrivateRoute>
              }
            />

            <Route
          path="/editar-modalidad/:id"
          element={
            <PrivateRoute>
              <EditarModalidad />
            </PrivateRoute>
          }
        />
        
        {/* ========== RUTAS DE INSCRIPCIONES ========== */}
        <Route
          path="/inscripciones"
          element={
            <PrivateRoute>
              <div className="construccion">
                <h2>Módulo de Inscripciones</h2>
                <p>Esta página está en construcción</p>
                <button onClick={() => window.history.back()}>Volver</button>
              </div>
            </PrivateRoute>
          }
        />
      
      
    </Routes>
  );
}



export default App;