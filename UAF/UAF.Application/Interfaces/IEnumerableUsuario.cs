using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Domain;

namespace UAF.Application.Interfaces
{
    public interface IEnumerableUsuario
    {
        public Task<IEnumerable<Usuario>> ListarUsuarioAsync();

        public Task<Usuario> ListarUsuarioPorIdAsync(int Id);

         Task NuevoUsuarioAsync(Usuario ousuario);

         Task EditarUsuarioAsync(Usuario ousuario);

         Task EliminarUsuarioAsync(int id);
    }
}
