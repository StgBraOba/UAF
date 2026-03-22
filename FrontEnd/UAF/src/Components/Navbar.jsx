import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function Navbar() {
  const { cambiarTema } = useContext(ThemeContext);
  const handleClick = () => {
  console.log("click funcionando");
  cambiarTema();
 };

  return (
    <button onClick={handleClick}>
      Cambiar tema
    </button>
  );
}

export default Navbar;