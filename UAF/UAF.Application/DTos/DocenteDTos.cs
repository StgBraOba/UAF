using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.DTos
{
    public class DocenteDTos
    {
        public int Cod_Docente { get; set; }
        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public int Edad { get; set; }

        public string Direccion { get; set; }

        public string Estado { get; set; }

        public int Id_Usuario { get; set; }
    }
}
