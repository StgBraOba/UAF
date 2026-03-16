import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

     try {
     const response = await axios.post("http://localhost:5171/api/Auth/login", {
      username:username,
      password:password,
    });

    console.log(response.data);

    // Guardar token
    localStorage.setItem("token", response.data.token);

    navigate("/dashboard");

  } catch (error) {
    alert("Usuario o contraseña incorrectos");
    console.error(error);
  }
  };

  return (
      <div className="login-container">
    <h2>Iniciar Sesion</h2>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Ingresar</button>
    </form>
  </div>

  );
}

export default Login;