using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableDocente
    {
         Task<IEnumerable<Docente>> ListarDocenteAsync();

         Task<IEnumerable<Docente>> ListarDocentePorNombreAsync(string Buscar);

        Task NuevoDocente(Docente odocente);

        Task EditarDocente(Docente odocente);

        Task EliminarDocente(int id);

    }
}
