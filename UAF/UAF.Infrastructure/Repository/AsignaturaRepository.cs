using UAF.Application.DTos;
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
    public class AsignaturaRepository : IEnumerableAsignatura
    {
        private readonly DBUniv _connectinstring;
        public AsignaturaRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }

        public async Task<IEnumerable<Asignatura>> ListarAsignaturaAsync()
        {
            var olist = new List<Asignatura>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarAsignatura", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Asignatura
                        {
                            Cod_Asignatura = Convert.ToInt32(dr["Cod_Asignatura"]),
                            NombreAsignatura = dr["NombreAsignatura"].ToString(),
                            Estado = dr["Estado"].ToString(),
                            Cod_Carrera = Convert.ToInt32(dr["Cod_Carrera"])
                        });
                    }
                }
                return olist;
            }
        }

        public async Task<IEnumerable<Asignatura>> ListarAsignaturaPorNomberAsync(string Buscar)
        {
            var olist = new List<Asignatura>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarAsignaturaPorNombre", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@NombreAsignatura", Buscar));
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Asignatura
                        {
                            Cod_Asignatura = Convert.ToInt32(dr["Cod_Asignatura"]),
                            NombreAsignatura = dr["NombreAsignatura"].ToString(),
                            Estado = dr["Estado"].ToString(),
                            Cod_Carrera = Convert.ToInt32(dr["Cod_Carrera"])
                        });
                    }
                }
                return olist;
            }
        }

        public async Task NuevaAsignaturaAsync(Asignatura oasignatura)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearAsignatura", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@NombreAsignatura", oasignatura.NombreAsignatura));

                cmd.Parameters.Add(new SqlParameter("@Estado", oasignatura.Estado));

                cmd.Parameters.Add(new SqlParameter("@Cod_Carrera", oasignatura.Cod_Carrera));

                await cmd.ExecuteNonQueryAsync();
            }
        }



        public async Task EditarAsignaturaAsync(Asignatura oasignatura)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarAsignatura", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Asignatura", oasignatura.Cod_Asignatura));
                cmd.Parameters.Add(new SqlParameter("@NombreAsignatura", oasignatura.NombreAsignatura));
                cmd.Parameters.Add(new SqlParameter("@Estado", oasignatura.Estado));

                cmd.Parameters.Add(new SqlParameter("@Cod_Carrera", oasignatura.Cod_Carrera));
                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarAsignaturaAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarAsignatura", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Asignatura", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

    


    }
}
