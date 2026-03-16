using UAF.Application.DTos;
using UAF.Application.Interfaces;
using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Services
{
    public class EstudianteServices
    {
        private readonly IEnumerableEstudiante _repository;

        public EstudianteServices(IEnumerableEstudiante repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EstudianteDTos>> ListaEstudiante()
        {
            var lista = await _repository.ListarEstudianteAsync();
            return lista.Select(x => new EstudianteDTos
            {
                Cod_Estudiante = x.Cod_Estudiante,
                Matricula = x.Matricula,
                Nombre = x.Nombre,
                Apellido = x.Apellido,
                Edad = x.Edad,
                Direccion = x.Direccion,
                Estado = x.Estado,
                Id_Usuario = x.Id_Usuario,
                Cod_Carrera = x.Cod_Carrera,
                Cod_Modalidad = x.Cod_Modalidad
            });

        }

        public async Task<IEnumerable<EstudianteDTos>> ListaEstudiantePorNombre(string Buscar)
        {
            if (string.IsNullOrWhiteSpace(Buscar))
                return Enumerable.Empty<EstudianteDTos>();


            var lista = await _repository.ListarEstudiantePorNombreAsync(Buscar);
            return lista.Select(x => new EstudianteDTos
            {
                Cod_Estudiante = x.Cod_Estudiante,
                Matricula = x.Matricula,
                Nombre = x.Nombre,
                Apellido = x.Apellido,
                Edad = x.Edad,
                Direccion = x.Direccion,
                Estado = x.Estado,
                Id_Usuario = x.Id_Usuario,
                Cod_Carrera = x.Cod_Carrera,
                Cod_Modalidad = x.Cod_Modalidad
            });

        }

        //Metodo Insertar

        public async Task NuevaEstudiante(EstudianteDTos dto)
        {
            var oestudiante = new Estudiante
            {
                Matricula = dto.Matricula,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Edad = dto.Edad,
                Direccion = dto.Direccion,
                Estado = dto.Estado,
                Id_Usuario = dto.Id_Usuario,
                Cod_Carrera = dto.Cod_Carrera,
                Cod_Modalidad = dto.Cod_Modalidad
            };

            await _repository.NuevoEstudianteAsync(oestudiante);
        }

        //Metodo Editar
        public async Task EditarEstudiante(EstudianteDTos dto)
        {
            var oestudiante = new Estudiante
            {
                Cod_Estudiante = dto.Cod_Estudiante,
                Matricula  = dto.Matricula,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Edad = dto.Edad,
                Direccion = dto.Direccion,
                Estado = dto.Estado,
                Id_Usuario = dto.Id_Usuario,
                Cod_Carrera = dto.Cod_Carrera,
                Cod_Modalidad = dto.Cod_Modalidad
            };

            await _repository.ActualizarEstudianteAsync(oestudiante);
        }

        //Metodo Eliminar
        public async Task EliminarEstudiante(int id)
        {
            await _repository.EliminarEstudianteAsync(id);
        }

    }
}
