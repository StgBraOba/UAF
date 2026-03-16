using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.DTos
{
    public class AsignaturaDTos
    {
        public int Cod_Asignatura { get; set; }
        public string NombreAsignatura { get; set; }

        public string Estado { get; set; }
        public int Cod_Carrera { get; set; }
    }
}
