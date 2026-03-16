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
    public class CalificacionServices
    {
        private readonly IEnumerableCalificacion _repository;

        public CalificacionServices(IEnumerableCalificacion repository)
        {
            _repository = repository;
        }


        public async Task<IEnumerable<CalificacionDTos>> ListarCalificacion()
        {
            var lista = await _repository.ListarCalificacionAsync();

            return lista.Select(x => new CalificacionDTos
            {
                Cod_Calificaion = x.Cod_Calificaion,
                NotaFinal = x.NotaFinal,
                Cod_Grupo = x.Cod_Grupo,
                Cod_Estudiante = x.Cod_Estudiante
            });

        }



       //Metodo Insertar

        public async Task NuevaCalificacion(CalificacionDTos dto)
        {
            var ocalificacion = new Calificacion
            {
                NotaFinal = dto.NotaFinal,
                Cod_Grupo = dto.Cod_Grupo,
                Cod_Estudiante = dto.Cod_Estudiante
            };

            await _repository.NuevaCalificacionAsync(ocalificacion);
        }

        //Metodo Editar
        public async Task EditarCalificacion(CalificacionDTos dto)
        {
            var ocalificacion = new Calificacion
            {
                Cod_Calificaion = dto.Cod_Calificaion,
                NotaFinal = dto.NotaFinal,
                Cod_Grupo = dto.Cod_Grupo,
                Cod_Estudiante = dto.Cod_Estudiante
            };

            await _repository.EditarCalificacionAsync(ocalificacion);
        }

        //Metodo Eliminar
        public async Task EliminarCalificacion(int id)
        {
            await _repository.EliminarCalificacionAsync(id);
        }
    }
}
