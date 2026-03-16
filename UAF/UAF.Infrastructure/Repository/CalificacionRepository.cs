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
    public class CalificacionRepository : IEnumerableCalificacion
    {

        private readonly DBUniv _connectinstring;
        public CalificacionRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }


        public async Task<IEnumerable<Calificacion>> ListarCalificacionAsync()
        {
            var olist = new List<Calificacion>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarCalificacion", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Calificacion
                        {
                            Cod_Calificaion = Convert.ToInt32(dr["Cod_Calificaion"]),
                            NotaFinal = Convert.ToInt32(dr["NotaFinal"]),
                          Cod_Grupo = Convert.ToInt32(dr["Cod_Grupo"]),
                            Cod_Estudiante = Convert.ToInt32(dr["Cod_Estudiante"])
                        });
                    }
                }
                return olist;
            }
        }

        public async Task NuevaCalificacionAsync(Calificacion ocalificacion)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearCalificacion", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@NotaFinal", ocalificacion.NotaFinal));
                cmd.Parameters.Add(new SqlParameter("@Cod_Grupo", ocalificacion.Cod_Grupo));
                cmd.Parameters.Add(new SqlParameter("@Cod_Estudiante", ocalificacion.Cod_Estudiante));

                await cmd.ExecuteNonQueryAsync();
            }
        }
        public async Task EditarCalificacionAsync(Calificacion ocalificacion)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarCalificacion", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Calificaion", ocalificacion.Cod_Calificaion));
                cmd.Parameters.Add(new SqlParameter("@NotaFinal", ocalificacion.NotaFinal));
                cmd.Parameters.Add(new SqlParameter("@Cod_Grupo", ocalificacion.Cod_Grupo));
                cmd.Parameters.Add(new SqlParameter("@Cod_Estudiante", ocalificacion.Cod_Estudiante));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarCalificacionAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarCalificacion", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Calificaion", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }


    }
}
