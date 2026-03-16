using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Domain;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableFacultad
    {
        Task<IEnumerable<Facultad>> ListarFacultadAsync();

        Task<IEnumerable<Facultad>> ListarFacultadPorNombreAsync(string Buscar);

        Task NuevaFacultadAsync(Facultad ofacultad);

        Task EditarFacultadAsync(Facultad ofacultad);

        Task EliminarFacultadAsync(int id);
    }
}

