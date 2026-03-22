export interface ICalificacion {
    cod_Calificaion: number;
    notaFinal: number;
    cod_Grupo: number;
    cod_Estudiante: number;
    // Propiedades adicionales para mostrar datos relacionados
    nombreEstudiante?: string;
    nombreGrupo?: string;
    nombreAsignatura?: string;
}