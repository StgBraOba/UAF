using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Domain;


namespace UAF.Application.Interfaces
{
    public interface IEnumerableEstudiante
    {
        Task<IEnumerable<Estudiante>> ListarEstudianteAsync();

        Task<IEnumerable<Estudiante>> ListarEstudiantePorNombreAsync(string Buscar);

        Task NuevoEstudianteAsync(Estudiante oestudiante);

        Task ActualizarEstudianteAsync(Estudiante oestudiante);

        Task EliminarEstudianteAsync(int id);

    }
}
