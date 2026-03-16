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
    public class AsignaturaServices
    {
        private readonly IEnumerableAsignatura _repository;

        public AsignaturaServices (IEnumerableAsignatura repository)
        {
            _repository = repository;
        }


        public async Task<IEnumerable<AsignaturaDTos>> ListarAsignatura()
        {
            var lista = await _repository.ListarAsignaturaAsync();

            return lista.Select(x => new AsignaturaDTos
            {
                Cod_Asignatura = x.Cod_Asignatura,
                NombreAsignatura = x.NombreAsignatura,
                Estado = x.Estado,
                Cod_Carrera = x.Cod_Carrera,
            });
            
        }



        public async Task<IEnumerable<AsignaturaDTos>> ListarAsignaturaPorNombre(string Buscar)
        {
            if (string.IsNullOrWhiteSpace(Buscar))
                return Enumerable.Empty<AsignaturaDTos>();

            var lista = await _repository.ListarAsignaturaPorNomberAsync(Buscar);

            return lista.Select(x => new AsignaturaDTos
            {
                Cod_Asignatura = x.Cod_Asignatura,
                NombreAsignatura = x.NombreAsignatura,
                Estado = x.Estado,
                Cod_Carrera = x.Cod_Carrera,
            });

        }


        //Metodo Insertar

        public async Task NuevaAsignatura(AsignaturaDTos dto)
        {
            var oasignatura = new Asignatura
            {
                NombreAsignatura = dto.NombreAsignatura,
                Estado = dto.Estado,
                Cod_Carrera = dto.Cod_Carrera,
            };

            await _repository.NuevaAsignaturaAsync(oasignatura);
        }

        //Metodo Editar
        public async Task EditarAsignatura(AsignaturaDTos dto)
        {
            var oasignatura = new Asignatura
            {
                Cod_Asignatura = dto.Cod_Asignatura,
                NombreAsignatura = dto.NombreAsignatura,
                Estado = dto.Estado,
                Cod_Carrera = dto.Cod_Carrera,
            };

            await _repository.EditarAsignaturaAsync(oasignatura);
        }

        //Metodo Eliminar
        public async Task EliminarAsignatura(int id)
        {
            await _repository.EliminarAsignaturaAsync(id);
        }

    }
}
