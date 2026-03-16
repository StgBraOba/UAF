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
    public class AsistenciaRepository : IEnumerableAsistencia
    {
        private readonly DBUniv _connectinstring;
        public AsistenciaRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }


        public async Task<IEnumerable<Asistencia>> ListarAsistenciaAsync()
        {
            var olist = new List<Asistencia>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarAsistencia", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Asistencia
                        {
                            Cod_Asistencia = Convert.ToInt32(dr["Cod_Asistencia"]),
                            Presente = dr["Presente"].ToString(),
                            Cod_Grupo = Convert.ToInt32(dr["Cod_Grupo"]),
                            Cod_Estudiante = Convert.ToInt32(dr["Cod_Estudiante"])
                        });
                    }
                }
                return olist;
            }
        }

        public async Task NuevaAsistenciaAsync(Asistencia oasistencia)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearAsistencia", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Fecha", oasistencia.Fecha));
                cmd.Parameters.Add(new SqlParameter("@Presente", oasistencia.Presente));
                cmd.Parameters.Add(new SqlParameter("@Cod_Grupo", oasistencia.Cod_Grupo));
                cmd.Parameters.Add(new SqlParameter("@Cod_Estudiante", oasistencia.Cod_Estudiante));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EditarAsistenciaAsync(Asistencia oasistencia)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarAsistencia", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Asistencia", oasistencia.Cod_Asistencia));
                //cmd.Parameters.Add(new SqlParameter("@Fecha", oasistencia.Fecha));
                cmd.Parameters.Add(new SqlParameter("@Presente", oasistencia.Presente));
                cmd.Parameters.Add(new SqlParameter("@Cod_Grupo", oasistencia.Cod_Grupo));
                cmd.Parameters.Add(new SqlParameter("@Cod_Estudiante", oasistencia.Cod_Estudiante));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarAsistenciaAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarAsistencia", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Asistencia", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

        

        
    }
}
