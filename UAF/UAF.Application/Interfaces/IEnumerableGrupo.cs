using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Domain;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableGrupo
    {
        Task<IEnumerable<Grupo>> ListarGrupoAsync();

        Task NuevoGrupoAsync(Grupo ogrupo);

        Task EditarGrupoAsync(Grupo ogrupo);

        Task EliminarGrupoAsync(int id);
    }
}
