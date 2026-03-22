export interface IAsistencia {
    cod_Asistencia: number;
    fecha: string; // Usamos string para manejar fechas en formato ISO
    presente: string;
    cod_Grupo: number;
    cod_Estudiante: number;
    // Propiedades adicionales para mostrar datos relacionados
    nombreEstudiante?: string;
    nombreGrupo?: string;
}