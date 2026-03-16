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
    public class FacultadRepository : IEnumerableFacultad
    {
        private readonly DBUniv _connectinstring;
        public FacultadRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }

        public async Task<IEnumerable<Facultad>> ListarFacultadAsync()
        {
            var olist = new List<Facultad>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarFacultad", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Facultad
                        {
                            Cod_Facultad = Convert.ToInt32(dr["Cod_Facultad"]),
                            Estado = dr["Estado"].ToString(),
                            Nombre = dr["Nombre"].ToString()
                        });
                    }
                }
                return olist;
            }
        }

        public async Task<IEnumerable<Facultad>> ListarFacultadPorNombreAsync(string Buscar)
        {
            var olist = new List<Facultad>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarFacultad_PorNombre", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Nombre", Buscar));
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Facultad
                        {
                            Cod_Facultad = Convert.ToInt32(dr["Cod_Facultad"]),
                            Estado = dr["Estado"].ToString(),
                            Nombre = dr["Nombre"].ToString()
                        });
                    }
                }
                return olist;
            }
        }

        public async Task NuevaFacultadAsync(Facultad ofacultad)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearFacultad", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Estadp", ofacultad.Estado));
                cmd.Parameters.Add(new SqlParameter("@Nombre", ofacultad.Nombre));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EditarFacultadAsync(Facultad ofacultad)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarFacultad", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Facultad", ofacultad.Cod_Facultad));
                cmd.Parameters.Add(new SqlParameter("@Estado", ofacultad.Estado));
                cmd.Parameters.Add(new SqlParameter("@Nombre", ofacultad.Nombre));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarFacultadAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarspFacultad", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Facultad", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

      

       

        
    }
}
