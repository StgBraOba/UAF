using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Domain;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableModalidad
    {
        public Task<IEnumerable<Modalidad>> ListarModalidadAsync();

        public Task<IEnumerable<Modalidad>> ListarModalidadPorNombreAsync(string Buscar);

        Task NuevaModalidadAsync(Modalidad omodalidad);

        Task EditarModalidadAsync(Modalidad omodalidad);

        Task EliminarModalidadAsync(int id);
    }
}
