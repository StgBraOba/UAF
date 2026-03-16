using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using UAF.Application.DTos;
using UAF.Application.Interfaces;
using UAF.Domain;

namespace UAF.Application.Services
{
    public class UsuarioServices
    {
        private readonly IEnumerableUsuario _repository;

        public UsuarioServices(IEnumerableUsuario repository)
        {
            _repository = repository; 
        }

        public async Task<IEnumerable<UsuarioDTos>> ListarUsuario()
        {
            var listar = await _repository.ListarUsuarioAsync();

            return listar.Select(x => new UsuarioDTos
            {
                Id_Usuario = x.Id_Usuario,
                username = x.username,
                
                email = x.email,
                Id_Rol = x.Id_Rol,
                Estado = x.Estado,
               PasswordHash = x.PasswordHash
            });
        }

        public async Task<UsuarioDTos> ListarPorId(int Id)
        {
            

            var usuario = await _repository.ListarUsuarioPorIdAsync(Id);
            if (usuario == null)
                return null;

            return new UsuarioDTos
            {
                Id_Usuario = usuario.Id_Usuario,
                username = usuario.username,
                email = usuario.email,
                Id_Rol = usuario.Id_Rol,
                Estado = usuario.Estado
            };

        }

            //Metodo Insertar

        public async Task NuevoUsuario(UsuarioDTos dto)
        {
            
            var ousuario = new Usuario
            {
                username = dto.username,
                
                email = dto.email,
                Id_Rol = dto.Id_Rol,
                Estado = dto.Estado,
                PasswordHash = dto.PasswordHash
            };

            await _repository.NuevoUsuarioAsync(ousuario);
        }

        //Metodo Editar
        public async Task EditarUsuario(UsuarioDTos dto)
        {
            
            var ousuario = new Usuario
            {
                Id_Usuario = dto.Id_Usuario,
                username = dto.username,
                
                email = dto.email,
                Id_Rol = dto.Id_Rol,
                Estado = dto.Estado,
                PasswordHash= dto.PasswordHash
            };

            await _repository.EditarUsuarioAsync(ousuario);
        }

        //Metodo Eliminar
        public async Task EliminarUsuarion(int id)
        {
            await _repository.EliminarUsuarioAsync(id);
        }
    }
}
