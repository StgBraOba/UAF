using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableInscripcion
    {

        Task<IEnumerable<Inscripcion>> ListarInscripcionAsync();

        Task<IEnumerable<Inscripcion>> ListarInscripcionPorNombreAsync(string Buscar);

        Task NuevaInscripcionAsync(Inscripcion oinscripcion);

        Task EditarInscripcionAsync(Inscripcion oinscripcion);

        Task EliminarInscripcionAsync(int id);
    }
}
