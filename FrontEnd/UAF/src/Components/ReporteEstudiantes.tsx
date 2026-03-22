import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IEstudiante } from "../Interfaces/IEstudiante";
import "../Modalidad.css"; // Reutilizamos los estilos de tu tabla que ya están bonitos

export function ReporteEstudiantes() {
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // 1. Cargar datos desde la API
  useEffect(() => {
    const obtenerEstudiantes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${appsettings.apiUrl}Estudiante`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEstudiantes(data);
        } else {
          console.error("Error al obtener estudiantes");
        }
      } catch (error) {
        console.error("Error de red", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerEstudiantes();
  }, []);

  // 2. Función para generar el PDF
  const generarPDF = () => {
    const doc = new jsPDF();
    
    // Título del documento
    doc.text("Reporte de Estudiantes - UAF", 14, 15);

    // Mapeamos los datos para la tabla del PDF
    const tableData = estudiantes.map((est) => [
      est.matricula,
      `${est.nombre} ${est.apellido}`,
      est.edad,
      est.estado
    ]);

    autoTable(doc, {
      head: [["Matrícula", "Nombre Completo", "Edad", "Estado"]],
      body: tableData,
      startY: 20, // Empieza debajo del título
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [39, 60, 117] } // Tu color azul oscuro #273c75
    });

    // Descargar el archivo
    doc.save("Reporte_Estudiantes_UAF.pdf");
  };

  return (
    <div className="modalidad-page" style={{ maxWidth: '1200px' }}>
       <header className="topbar">
            <div className="logo">
              <h2>UAF</h2>
            </div>

            <nav>
              <ul className="menuhorizontal">
                <li className="menuhorizontal-item" onClick={() => navigate("/dashboard")}>Inicio</li>
                <li className="menuhorizontal-item" onClick={() => navigate("/Reportes")}>Reportes</li>
                <li className="menuhorizontal-item">Nosotros</li>
              </ul>
            </nav>
          </header>
      <div className="modalidad-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Reporte de Estudiantes</h2>
        <button 
          className="btn edit" 
          onClick={generarPDF}
          disabled={estudiantes.length === 0}
          style={{ backgroundColor: '#e1b12c', color: '#fff' }} // Un color dorado/amarillo para destacar
        >
          📄 Descargar PDF
        </button>
      </div>
      <hr />

      {cargando ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Cargando datos...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="modalidad-table">
            <thead>
              <tr>
                <th>Cod</th>
                <th>Matrícula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Dirección</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>No hay estudiantes registrados.</td>
                </tr>
              ) : (
                estudiantes.map((est) => (
                  <tr key={est.cod_Estudiante}>
                    <td>{est.cod_Estudiante}</td>
                    <td>{est.matricula}</td>
                    <td>{est.nombre}</td>
                    <td>{est.apellido}</td>
                    <td>{est.edad}</td>
                    <td>{est.direccion}</td>
                    <td>{est.estado}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}