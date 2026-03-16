using UAF.Application.Interfaces;
using UAF.Domain;
using UAF.Infrastructure.DataBase;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Infrastructure.Repository
{
    public class UsuarioRepository : IEnumerableUsuario
    {

        private readonly DBUniv _connectinstring;
        public UsuarioRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }

        public async Task<IEnumerable<Usuario>> ListarUsuarioAsync()
        {
            var olist = new List<Usuario>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarUsuario", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Usuario
                        {
                            Id_Usuario = Convert.ToInt32(dr["Id_Usuario"]),
                            username = dr["username"].ToString(),
                            
                            email = dr["email"].ToString(),
                            Id_Rol = Convert.ToInt32(dr["Id_Rol"]),
                            Estado = dr["Estado"].ToString(),
                            PasswordHash = dr["PasswordHash"].ToString()
                        });
                    }
                }
                return olist;
            }
        }


        public async Task<Usuario> ListarUsuarioPorIdAsync(int id)
        {
            Usuario usuario = null;

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarUsuarioPorId", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Id", id));
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        usuario = new Usuario
                        {
                            Id_Usuario = Convert.ToInt32(dr["Id_Usuario"]),
                            username = dr["username"].ToString(),
                            
                            email = dr["email"].ToString(),
                            Id_Rol = Convert.ToInt32(dr["Id_Rol"]),
                            Estado = dr["Estado"].ToString(),
                            PasswordHash = dr["PasswordHash"].ToString(),
                        };
                    }
                }
                return usuario;
            }
        }


        public async Task NuevoUsuarioAsync(Usuario ousuario)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            string hash = BCrypt.Net.BCrypt.HashPassword(ousuario.PasswordHash);

            using (SqlCommand cmd = new SqlCommand("CrearUsuario", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@username", ousuario.username));
                
                cmd.Parameters.Add(new SqlParameter("@email", ousuario.email));
                cmd.Parameters.Add(new SqlParameter("@Id_Rol", ousuario.Id_Rol));
                
                cmd.Parameters.Add(new SqlParameter("@Estado", ousuario.Estado));
                cmd.Parameters.Add(new SqlParameter("@PasswordHash", hash));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EditarUsuarioAsync(Usuario ousuario)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            string hash = BCrypt.Net.BCrypt.HashPassword(ousuario.PasswordHash);


            using (SqlCommand cmd = new SqlCommand("ActualizarUsuario", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Id_Usuario", ousuario.Id_Usuario));
                cmd.Parameters.Add(new SqlParameter("@username", ousuario.username));
                
                cmd.Parameters.Add(new SqlParameter("@email", ousuario.email));
                cmd.Parameters.Add(new SqlParameter("@Id_Rol", ousuario.Id_Rol));
                cmd.Parameters.Add(new SqlParameter("@Estado", ousuario.Estado));
                cmd.Parameters.Add(new SqlParameter("@PasswordHash", hash));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarUsuarioAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarUsuario", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Id_Usuario", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

        

       

        
    }
}
