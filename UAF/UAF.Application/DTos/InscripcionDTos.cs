using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.DTos
{
    public class InscripcionDTos
    {
        public int Cod_Inscripcion { get; set; }
        public string Perido { get; set; }

        public DateTime Fecha_Creacion { get; set; }

        public int Cod_Estudiante { get; set; }

        
    }
}
