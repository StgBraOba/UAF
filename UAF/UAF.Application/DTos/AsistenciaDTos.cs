using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.DTos
{
    public class AsistenciaDTos
    {
        public int Cod_Asistencia { get; set; }

        public DateTime Fecha { get; set; }

        public string Presente { get; set; }

        public int Cod_Grupo { get; set; }

        public int Cod_Estudiante { get; set; }
    }
}
