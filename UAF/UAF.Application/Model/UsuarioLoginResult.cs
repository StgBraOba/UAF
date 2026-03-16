using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Model
{
    public class UsuarioLoginResult
    {
        public string Username { get; set; }
     
        
        public string Rol { get; set; }

        public string PasswordHash { get; set; }
    }
}
