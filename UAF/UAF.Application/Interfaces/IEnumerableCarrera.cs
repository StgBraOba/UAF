using UAF.Application.DTos;
using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableCarrera
    {
         Task<IEnumerable<Carrera>> ListarCarreraAsync();

        Task<IEnumerable<Carrera>> ListarCarreraPorNombreAsync(string Buscar);

        Task NuevaCarreraAsync(Carrera ocarrera);

        Task EditarCarreraAsync(Carrera ocarrera);

        Task EliminarCarreraAsync(int id);
    }
}
