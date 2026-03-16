using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Domain
{
    public class Grupo
    {
       public int Cod_Grupo { get; set; }

        public int Cod_Inscripcion { get; set; }

        public int Cod_Docente { get; set; }

        public int Cupo { get; set; }


        public string Estado { get; set; }

        public int CodigoGrupo { get; set; }
    }
}
