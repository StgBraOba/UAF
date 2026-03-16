using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using UAF.Application.DTos;
using UAF.Application.Interfaces;
using UAF.Domain;

namespace UAF.Application.Services
{
    public class RolServices
    {
        private readonly IEnumarableRol _repository;
        //_reposoroty
        public RolServices(IEnumarableRol repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<RolDTos>> ListarRol()
        {
            var listar = await _repository.ListarRolAsync();

            return listar.Select(r => new RolDTos
            {
                Id_Rol = r.Id_Rol,
                Estado = r.Estado,
                rol = r.rol
            });
        }


        public async Task<IEnumerable<RolDTos>> ListarPorNombre(string Buscar)
        {
            if (string.IsNullOrWhiteSpace(Buscar))
                return Enumerable.Empty<RolDTos>();

            var listar = await _repository.ListarRolPorNombreAsync(Buscar);
            return listar.Select(r => new RolDTos
            { Id_Rol = r.Id_Rol,
            Estado = r.Estado,
              rol = r.rol 
            } );

        }

        //Metodo Insertar

        public async Task NuevoRol(RolDTos dto)
        {
            var orol = new Rol
            {
                Estado = dto.Estado,
                rol = dto.rol
            };
            
            await _repository.NuevoRolAsync(orol);
        }

        //Metodo Editar
        public async Task EditarRol(RolDTos dto)
        {
            var orol = new Rol
            {
                Id_Rol = dto.Id_Rol,
                Estado = dto.Estado,
                rol = dto.rol
            };

            await _repository.EditarRolAsync(orol);  
        }

        //Metodo Eliminar
        public async Task EliminarRol (int id)
        {
            await _repository.EliminarRolAsync(id);
        }
    }
}
