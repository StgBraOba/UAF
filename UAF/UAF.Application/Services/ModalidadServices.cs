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
    public class ModalidadServices
    {
        private readonly IEnumerableModalidad _repository;
        //_reposoroty
        public ModalidadServices(IEnumerableModalidad repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ModalidadDTos>> ListarModalidad()
        {
            var listar = await _repository.ListarModalidadAsync();

            return listar.Select(r => new ModalidadDTos
            {
                Cod_Modalidad = r.Cod_Modalidad,
                Estado = r.Estado,
                modalidad = r.modalidad
            });
        }


        public async Task<IEnumerable<ModalidadDTos>> ListarPorNombre(string Buscar)
        {
            if (string.IsNullOrWhiteSpace(Buscar))
                return Enumerable.Empty<ModalidadDTos>();

            var listar = await _repository.ListarModalidadPorNombreAsync(Buscar);
            return listar.Select(r => new ModalidadDTos
            {
                Cod_Modalidad = r.Cod_Modalidad,
                Estado = r.Estado,
                modalidad = r.modalidad
            });

        }

        //Metodo Insertar

        public async Task NuevaModalidad(ModalidadDTos dto)
        {
            var omodalidad = new Modalidad
            {
                Estado = dto.Estado,
                modalidad = dto.modalidad
            };

            await _repository.NuevaModalidadAsync(omodalidad);
        }

        //Metodo Editar
        public async Task EditarModalidad(ModalidadDTos dto)
        {
            var omodalidad = new Modalidad
            {
                Cod_Modalidad = dto.Cod_Modalidad,
                Estado = dto.Estado,
                modalidad = dto.modalidad
            };

            await _repository.EditarModalidadAsync(omodalidad);
        }

        //Metodo Eliminar
        public async Task EliminarModalidad(int id)
        {
            await _repository.EliminarModalidadAsync(id);
        }

    }
}
