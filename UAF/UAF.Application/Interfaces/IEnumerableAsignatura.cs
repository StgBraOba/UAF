using UAF.Application.DTos;
using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableAsignatura
    {
        Task<IEnumerable<Asignatura>> ListarAsignaturaAsync();

        Task<IEnumerable<Asignatura>> ListarAsignaturaPorNomberAsync(string Buscar);

        Task NuevaAsignaturaAsync(Asignatura oasignatura);

        Task EditarAsignaturaAsync(Asignatura oasignatura);

        Task EliminarAsignaturaAsync(int id);
    }
}
