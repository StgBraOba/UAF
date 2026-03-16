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
    public class InscripcionDetalleServices
    {
        private readonly IEnumerableInscripcionDetalle _repository;

        public InscripcionDetalleServices(IEnumerableInscripcionDetalle repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<InscripcionDetalleDTos>> ListarInscripcionDetealle()
        {
            var lista = await _repository.ListarInscripcionDetalleAsync();
            return lista.Select(x => new InscripcionDetalleDTos
            {
                Cod_InscripcionDetalle = x.Cod_InscripcionDetalle,
                Cod_Inscripcion = x.Cod_Inscripcion,
               Cod_Clase = x.Cod_Clase,
               Cod_Grupo = x.Cod_Grupo

            });

        }

        //Metodo Insertar

        public async Task NuevaInscripcionDetalle(InscripcionDetalleDTos dto)
        {
            var oinscripciondetalle = new InscripcionDetalle
            {
                Cod_Inscripcion = dto.Cod_Inscripcion,
                Cod_Clase = dto.Cod_Clase,
                Cod_Grupo = dto.Cod_Grupo

            };

            await _repository.NuevaInscripcionDetalleAsync(oinscripciondetalle);
        }

        //Metodo Editar
        public async Task EditarInscripcionDetalle(InscripcionDetalleDTos dto)
        {
            var oinscripcionDetalle = new InscripcionDetalle
            {
                Cod_InscripcionDetalle = dto.Cod_InscripcionDetalle,
                Cod_Inscripcion = dto.Cod_Inscripcion,
                Cod_Clase = dto.Cod_Clase,
                Cod_Grupo = dto.Cod_Grupo

            };

            await _repository.EditarInscripcionDetalleAsync(oinscripcionDetalle);
        }

        //Metodo Eliminar
        public async Task EliminarInscripcionDetalle(int id)
        {
            await _repository.EliminarInscripcionDetalleAsync(id);
        }
    }
}
