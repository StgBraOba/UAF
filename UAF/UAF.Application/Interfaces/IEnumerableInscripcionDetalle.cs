using UAF.Application.DTos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Domain;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableInscripcionDetalle
    {
        Task<IEnumerable<InscripcionDetalle>> ListarInscripcionDetalleAsync();

        Task NuevaInscripcionDetalleAsync(InscripcionDetalle oinscripciondetalle);
        Task EditarInscripcionDetalleAsync(InscripcionDetalle oinscripciondetalle);
        Task EliminarInscripcionDetalleAsync(int id);

    }
}
