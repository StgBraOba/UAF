using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Domain
{
    public class Asistencia
    {
        public int Cod_Asistencia { get; set; }

        public DateTime Fecha { get; set; }

        public string Presente { get; set; }

        public int Cod_Grupo { get; set; }

        public int Cod_Estudiante { get; set; }
    }
}
