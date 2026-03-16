using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using UAF.Application.DTos;
using UAF.Application.Interfaces;
using BCrypt.Net;

namespace UAF.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _repository;
        private readonly IJwtService _jwtService;

        
        

        private bool VerifyPassword(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }

        public AuthService(IUsuarioRepository repository, IJwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        public async Task<AuthResponseDTO> Login(LogInDTO request)
        {
            var user = await _repository.LoginAsync(request.Username);

            if (user == null)
                return new AuthResponseDTO(false, "Usuario no existe");


            Console.WriteLine("Username recibido: " + request.Username);
            Console.WriteLine("Password recibida: '" + request.Password + "'");
            Console.WriteLine("Hash en BD: " + user.PasswordHash);

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return new AuthResponseDTO(false, "Contraseña incorrecta");

            var token = _jwtService.CreateToken(user.Username, user.Rol);

            return new AuthResponseDTO(true,"Login Exitoso", token);
        }
    }
}
