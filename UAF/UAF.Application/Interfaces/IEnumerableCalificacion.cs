using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableCalificacion
    {
        Task<IEnumerable<Calificacion>> ListarCalificacionAsync();

        Task NuevaCalificacionAsync(Calificacion ocalificacion);

        Task EditarCalificacionAsync(Calificacion ocalificacion);

        Task EliminarCalificacionAsync(int id);
    }
}
