using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Domain
{
    public class Carrera
    {
        public int Cod_Carrera { get; set; }
        public string NombreCarrera{ get; set; }

        public string Estado { get; set; }

        public int Cod_Facultad {  get; set; }
    }
}
