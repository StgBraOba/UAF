using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableAsistencia
    {
        Task<IEnumerable<Asistencia>> ListarAsistenciaAsync();

        Task NuevaAsistenciaAsync(Asistencia oasistencia);

        Task EditarAsistenciaAsync(Asistencia oasistencia);

        Task EliminarAsistenciaAsync(int id);
    }
}
