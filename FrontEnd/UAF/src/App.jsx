import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuario";
import { NuevoUsuario } from "./Components/NuevoUsuario";
import { EditarUsuario } from "./Components/EditarUsuario";
import { ListarUsuarios } from "./Components/ListarUsuario";

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
   /*Para usuario */
   <Route path="/usuarios" element={<Usuarios />} />
   <Route path="/nuevousuario" element={<NuevoUsuario />} />
   <Route path="/editarusuario/:id" element={<EditarUsuario />} />
    <Route path="/listarusuarios" element={<ListarUsuarios />} />
    </Routes>
  );
}



export default App;