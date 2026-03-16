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
    public class AsistenciaServices
    {
        private readonly IEnumerableAsistencia _repository;

        public AsistenciaServices(IEnumerableAsistencia repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<AsistenciaDTos>> ListaAsistencia()
        {
            var lista = await _repository.ListarAsistenciaAsync();
            return lista.Select(x => new AsistenciaDTos
            {
               Cod_Asistencia = x.Cod_Asistencia,
               
               Presente = x.Presente,
               Cod_Grupo = x.Cod_Grupo,
                Cod_Estudiante = x.Cod_Estudiante
            });

        }

        

        //Metodo Insertar

        public async Task NuevaAsistencia(AsistenciaDTos dto)
        {
            var oasistencia = new Asistencia
            {
                Fecha = dto.Fecha,
                Presente = dto.Presente,
                Cod_Grupo = dto.Cod_Grupo,
                Cod_Estudiante = dto.Cod_Estudiante
            };

            await _repository.NuevaAsistenciaAsync(oasistencia);
        }

        //Metodo Editar
        public async Task EditarAsistencia(AsistenciaDTos dto)
        {
            var oasistencia = new Asistencia
            {
                Cod_Asistencia = dto.Cod_Asistencia,
               
                Presente = dto.Presente,
                Cod_Grupo = dto.Cod_Grupo,
                Cod_Estudiante = dto.Cod_Estudiante
            };

            await _repository.EditarAsistenciaAsync(oasistencia);
        }

        //Metodo Eliminar
        public async Task EliminarAsistencia(int id)
        {
            await _repository.EliminarAsistenciaAsync(id);
        }
    }
}
