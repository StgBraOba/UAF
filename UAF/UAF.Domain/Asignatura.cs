using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Domain
{
    public class Asignatura
    {
        public int Cod_Asignatura { get; set; }
        public string NombreAsignatura { get; set; }

        public string Estado { get; set; }
        public int Cod_Carrera { get; set; }
    }
}
