using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Application.DTos;
using UAF.Application.Interfaces;
using UAF.Domain;

namespace UAF.Application.Services
{
    public class FacultadServices
    {
        private readonly IEnumerableFacultad _repository;

        public FacultadServices(IEnumerableFacultad repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<FacultadDTos>> ListarFacultad()
        {
            var listar = await _repository.ListarFacultadAsync();

            return listar.Select(r => new FacultadDTos
            {
                Cod_Facultad = r.Cod_Facultad,
                Estado = r.Estado,
                Nombre = r.Nombre
            });
        }


        public async Task<IEnumerable<FacultadDTos>> ListarPorNombre(string Buscar)
        {
            if (string.IsNullOrWhiteSpace(Buscar))
                return Enumerable.Empty<FacultadDTos>();

            var listar = await _repository.ListarFacultadPorNombreAsync(Buscar);
            return listar.Select(r => new FacultadDTos
            {
                Cod_Facultad = r.Cod_Facultad,
                Estado = r.Estado,
                Nombre = r.Nombre
            });

        }

        //Metodo Insertar

        public async Task NuevaFacultad(FacultadDTos dto)
        {
            var ofacultad = new Facultad
            {
                Estado =dto.Estado,
                Nombre = dto.Nombre
            };

            await _repository.NuevaFacultadAsync(ofacultad);
        }

        //Metodo Editar
        public async Task EditarFacultad(FacultadDTos dto)
        {
            var ofacultad = new Facultad
            {
                Cod_Facultad = dto.Cod_Facultad,
                Estado = dto.Estado,
                Nombre = dto.Nombre
            };

            await _repository.EditarFacultadAsync(ofacultad);
        }

        //Metodo Eliminar
        public async Task EliminarFacultad(int id)
        {
            await _repository.EliminarFacultadAsync(id);
        }


    }
}
