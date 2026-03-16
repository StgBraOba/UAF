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


    public class GrupoServices
    {
        private readonly IEnumerableGrupo _repository;

        public GrupoServices(IEnumerableGrupo repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<GrupoDTos>> ListaGrupo()
        {
            var lista = await _repository.ListarGrupoAsync();
            return lista.Select(x => new GrupoDTos
            {
                Cod_Grupo = x.Cod_Grupo,
                
                Cod_Docente = x.Cod_Docente,
                Cupo = x.Cupo,
                Estado = x.Estado,
                CodigoGrupo = x.CodigoGrupo
            });

        }

        //public async Task<IEnumerable<GrupoDTos>> ListaCarreraPorNombre(string Buscar)
        //{
        //    if (string.IsNullOrWhiteSpace(Buscar))
        //        return Enumerable.Empty<CarreraDTos>();


        //    var lista = await _repository.ListarCarreraPorNombreAsync(Buscar);
        //    return lista.Select(x => new CarreraDTos
        //    {
        //        Cod_Carrera = x.Cod_Carrera,
        //        NombreCarrera = x.NombreCarrera,
        //        Estado = x.Estado,
        //        Cod_Facultad = x.Cod_Facultad
        //    });

        //}

        //Metodo Insertar

        public async Task NuevaGrupo(GrupoDTos dto)
        {
            var ogrupo = new Grupo
            {
                
                Cod_Docente = dto.Cod_Docente,
                Cupo = dto.Cupo,
                Estado = dto.Estado,
                CodigoGrupo = dto.CodigoGrupo
            };

            await _repository.NuevoGrupoAsync(ogrupo);
        }

        //Metodo Editar
        public async Task EditarGrupo(GrupoDTos dto)
        {
            var ogrupo = new Grupo
            {
                Cod_Grupo = dto.Cod_Grupo,
              
                Cod_Docente = dto.Cod_Docente,
                Cupo = dto.Cupo,
                Estado = dto.Estado,
                CodigoGrupo = dto.CodigoGrupo
            };

            await _repository.EditarGrupoAsync(ogrupo);
        }

        //Metodo Eliminar
        public async Task EliminarGrupo(int id)
        {
            await _repository.EliminarGrupoAsync(id);
        }
    }
}


