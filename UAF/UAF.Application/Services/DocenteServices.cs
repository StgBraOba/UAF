using UAF.Application.Interfaces;
using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Application.DTos;

namespace UAF.Application.Services
{
    public class DocenteServices
    {
        private readonly IEnumerableDocente _repository;

        public DocenteServices (IEnumerableDocente repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<DocenteDTos>> ListarDocente()
        {
            var listar = await _repository.ListarDocenteAsync();
            return listar.Select(x => new DocenteDTos{
                Cod_Docente = x.Cod_Docente,
                Nombre = x.Nombre,
                Apellido = x.Apellido,
                Edad = x.Edad,
                Direccion = x.Direccion,
                Estado = x.Estado,
                Id_Usuario  = x.Id_Usuario,
            });
        }

        public async Task<IEnumerable<DocenteDTos>> ListarDocentePorNombreAsync(string Buscar)
        {
            if(string.IsNullOrWhiteSpace(Buscar))
                return Enumerable.Empty<DocenteDTos>();

            var listar = await _repository.ListarDocenteAsync();
            return listar.Select(x => new DocenteDTos{
                Cod_Docente = x.Cod_Docente,
                Nombre = x.Nombre,
                Apellido = x.Apellido,
                Edad = x.Edad,
                Direccion = x.Direccion,
                Estado= x.Estado,
                Id_Usuario = x.Id_Usuario,
            });
        }

        //Metodo Insertar

        public async Task NuevaDocente(DocenteDTos dto)
        {
            var odocente = new Docente
            {
                
                Nombre = dto.Nombre,
                Apellido= dto.Apellido,
                Edad  = dto.Edad,
                Direccion = dto.Direccion,
                Estado = dto.Estado,
                Id_Usuario= dto.Id_Usuario,
            };

            await _repository.NuevoDocente(odocente);
        }

        //Metodo Editar
        public async Task EditarDocente(DocenteDTos dto)
        {
            var odocente = new Docente
            {
                Cod_Docente = dto.Cod_Docente,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Edad = dto.Edad,
                Direccion = dto.Direccion,
                Estado = dto.Estado,
                Id_Usuario = dto.Id_Usuario,
            };

            await _repository.EditarDocente(odocente);
        }

        //Metodo Eliminar
        public async Task EliminarDocente(int id)
        {
            await _repository.EliminarDocente(id);
        }
    }
}
