using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Domain
{
    public class Estudiante
    {
        public int Cod_Estudiante { get; set; }

        public int Matricula { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public int Edad { get; set; }

        public string Direccion { get; set; }

        public string Estado { get; set; }

        public int Id_Usuario { get; set; }

        public int Cod_Carrera { get; set; }

        public int Cod_Modalidad { get; set; }

    }
}
