using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Application.DTos;
using UAF.Application.Interfaces;
using UAF.Application.Model;
using UAF.Infrastructure.DataBase;

namespace UAF.Infrastructure.Repository
{
    public class AuthRepository : IUsuarioRepository
    {
        private readonly DBUniv _connectinstring;
        public AuthRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }

        public async Task<UsuarioLoginResult?> LoginAsync(string username)
        {
            using var connection = _connectinstring.CreateConnection();
            using var command = new SqlCommand("SP_Login", connection);

            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@Username", username);

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new UsuarioLoginResult
                {
                    Username = reader["Username"].ToString(),
                    
                    PasswordHash = reader["PasswordHash"].ToString(),
                    Rol = reader["Rol"].ToString()
                };
            }

            return null;
        }
    }
}
