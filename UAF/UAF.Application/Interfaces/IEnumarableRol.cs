using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Interfaces
{
    public interface IEnumarableRol
    {
        Task<IEnumerable<Rol>> ListarRolAsync();

        Task<IEnumerable<Rol>> ListarRolPorNombreAsync(string Buscar);

        Task NuevoRolAsync(Rol orol);

        Task EditarRolAsync(Rol orol);

        Task EliminarRolAsync(int id);
    }
}
