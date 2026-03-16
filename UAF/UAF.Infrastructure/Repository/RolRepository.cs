using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using UAF.Application;
using UAF.Application.Interfaces;
using UAF.Domain;
using UAF.Infrastructure.DataBase;
using System.Data;
using System.Reflection.Metadata;


namespace UAF.Infrastructure.Repository
{
    public class RolRepository : IEnumarableRol
    {
        private readonly DBUniv _connectinstring;
        public RolRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }


        public async Task<IEnumerable<Rol>> ListarRolAsync()
        {
            var olist = new List<Rol>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarRol", con)) 
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync()) 
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Rol
                        {
                            Id_Rol = Convert.ToInt32(dr["Id_Rol"]),
                            Estado = dr["Estado"].ToString(),
                            rol = dr["rol"].ToString()
                        });
                    }
                }
                return olist;
            }
        }




        public async Task<IEnumerable<Rol>> ListarRolPorNombreAsync(string Buscar)
        {
            var olist = new List<Rol>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("BucarRolPorNombre", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Buscar", Buscar));
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Rol
                        {
                            Id_Rol = Convert.ToInt32(dr["Id_Rol"]),
                            Estado = dr["Estado"].ToString(),
                            rol = dr["rol"].ToString()
                        });
                    }
                }
                return olist;
            }
        }

        public async Task NuevoRolAsync(Rol orol)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearRol", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Estado", orol.Estado));
                cmd.Parameters.Add(new SqlParameter("@Rol", orol.rol));

                await cmd.ExecuteNonQueryAsync();
            }



        }

        public async Task EditarRolAsync(Rol orol)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarRol", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Id_Rol", orol.Id_Rol));
                cmd.Parameters.Add(new SqlParameter("@Estado", orol.Estado));
                cmd.Parameters.Add(new SqlParameter("@Rol", orol.rol));

                await cmd.ExecuteNonQueryAsync();
            }



        }

        public async Task EliminarRolAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarRol", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Id_Rol", id));
                

                await cmd.ExecuteNonQueryAsync();
            }

        }



        
    }
}
