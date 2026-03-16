using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Application.DTos;
using UAF.Application.Model;

namespace UAF.Application.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<UsuarioLoginResult?> LoginAsync(string username);
    }
}
