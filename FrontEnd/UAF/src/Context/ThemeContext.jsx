import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const temas = ["tema-claro", "tema-oscuro", "tema-azul"];

export const ThemeProvider = ({ children }) => {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "tema-claro";
  });

  const cambiarTema = () => {
    const index = temas.indexOf(tema);
    const siguiente = (index + 1) % temas.length;
    setTema(temas[siguiente]);
  };

useEffect(() => {
  const root = document.getElementById("root");

  root.classList.remove("tema-claro", "tema-oscuro", "tema-azul");
  root.classList.add(tema);
}, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
};