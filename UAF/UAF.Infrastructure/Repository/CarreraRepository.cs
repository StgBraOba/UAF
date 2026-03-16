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
    public class CarreraRepository : IEnumerableCarrera
    {
        private readonly DBUniv _connectinstring;
        public CarreraRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }

        public async Task<IEnumerable<Carrera>> ListarCarreraAsync()
        {
            var olist = new List<Carrera>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarCarrera", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Carrera
                        {
                            Cod_Carrera = Convert.ToInt32(dr["Cod_Carrera"]),
                            NombreCarrera = dr["NombreCarrera"].ToString(),
                            Estado = dr["Estado"].ToString(),
                            Cod_Facultad = Convert.ToInt32(dr["Cod_Facultad"])
                        });
                    }
                }
                return olist;
            }
        }

        public async Task<IEnumerable<Carrera>> ListarCarreraPorNombreAsync(string Buscar)
        {
            var olist = new List<Carrera>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarCarreraPorNombre", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@NombreCarrera", Buscar));
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Carrera
                        {
                            Cod_Carrera = Convert.ToInt32(dr["Cod_Carrera"]),
                            NombreCarrera = dr["NombreCarrera"].ToString(),
                            Estado = dr["Estado"].ToString(),
                            Cod_Facultad = Convert.ToInt32(dr["Cod_Facultad"])
                        });
                    }
                }
                return olist;
            }
        }


        public async Task NuevaCarreraAsync(Carrera ocarrera)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearCarrera", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@NombreCarrera", ocarrera.NombreCarrera));
                cmd.Parameters.Add(new SqlParameter("@Estado", ocarrera.Estado));
                cmd.Parameters.Add(new SqlParameter("@Cod_Facultad", ocarrera.Cod_Facultad));

                await cmd.ExecuteNonQueryAsync();
            }
        }


        public async Task EditarCarreraAsync(Carrera ocarrera)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarCarrera", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Carrera", ocarrera.Cod_Carrera));
                cmd.Parameters.Add(new SqlParameter("@NombreCarrera", ocarrera.NombreCarrera));
                cmd.Parameters.Add(new SqlParameter("@Estado", ocarrera.Estado));
                cmd.Parameters.Add(new SqlParameter("@Cod_Facultad", ocarrera.Cod_Facultad));
                await cmd.ExecuteNonQueryAsync();
            }

        }

        public async Task EliminarCarreraAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarCarrera", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Carrera", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }



      
    }
}
