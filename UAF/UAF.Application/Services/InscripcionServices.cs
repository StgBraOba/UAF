using UAF.Application.DTos;
using UAF.Application.Interfaces;
using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.Services
{
    public class InscripcionServices
    {
        private readonly IEnumerableInscripcion _repository;

        public InscripcionServices(IEnumerableInscripcion repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<InscripcionDTos>> ListaInscripcion()
        {
            var lista = await _repository.ListarInscripcionAsync();
            return lista.Select(x => new InscripcionDTos
            {
               Cod_Inscripcion = x.Cod_Inscripcion,
                Perido = x.Perido,
              
               Cod_Estudiante = x.Cod_Estudiante,
               

            });

        }

       

        //Metodo Insertar

        public async Task NuevaInscripcion(InscripcionDTos dto)
        {
            var oinscripcion = new Inscripcion
            {
                Perido = dto.Perido,
                Fecha_Creacion = dto.Fecha_Creacion,
                Cod_Estudiante = dto.Cod_Estudiante
                
            };

            await _repository.NuevaInscripcionAsync(oinscripcion);
        }

        //Metodo Editar
        public async Task EditarInscripcion(InscripcionDTos dto)
        {
            var oinscripcion = new Inscripcion
            {
                Cod_Inscripcion = dto.Cod_Inscripcion,
                Perido = dto.Perido,
                Cod_Estudiante = dto.Cod_Estudiante
                
            };

            await _repository.EditarInscripcionAsync(oinscripcion);
        }

        //Metodo Eliminar
        public async Task EliminarInscripcion(int id)
        {
            await _repository.EliminarInscripcionAsync(id);
        }
    }
}
