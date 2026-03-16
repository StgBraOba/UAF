using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.DTos
{
    public class CalificacionDTos
    {
        public int Cod_Calificaion { get; set; }
        public decimal NotaFinal { get; set; }
        public int Cod_Grupo { get; set; }

        public int Cod_Estudiante { get; set; }
    }
}
