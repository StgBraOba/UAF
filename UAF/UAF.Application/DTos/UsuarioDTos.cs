using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.DTos
{
    public class UsuarioDTos
    {
        public int Id_Usuario { get; set; }

        public string username { get; set; }

       

        public string email { get; set; }

        public int Id_Rol { get; set; }

        public string Estado { get; set; }

        public string PasswordHash { get; set; }

    }
}
