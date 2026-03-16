using UAF.Application.Interfaces;
using UAF.Infrastructure.DataBase;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Domain;

namespace UAF.Infrastructure.Repository
{
    public class GrupoRepository : IEnumerableGrupo
    {
       
            private readonly DBUniv _connectinstring;
            public GrupoRepository(DBUniv connectinstring)
            {
                _connectinstring = connectinstring;
            }


        public async Task<IEnumerable<Grupo>> ListarGrupoAsync()
        {
            var olist = new List<Grupo>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarGrupo", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Grupo
                        {
                            Cod_Grupo = Convert.ToInt32(dr["Cod_Grupo"]),
                            Cod_Docente = Convert.ToInt32(dr["Cod_Docente"]),

                            Cupo = Convert.ToInt32(dr["Cupo"]),
                            Estado = dr["Estado"].ToString(),
                            CodigoGrupo = Convert.ToInt32(dr["CodigoGrupo"])
                        });
                    }
                }
                return olist;
            }
        }



        public async Task NuevoGrupoAsync(Grupo ogrupo)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearGrupo", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                

                cmd.Parameters.Add(new SqlParameter("@Cod_Docente", ogrupo.Cod_Docente));

                cmd.Parameters.Add(new SqlParameter("@Cupo", ogrupo.Cupo));

                cmd.Parameters.Add(new SqlParameter("@Estado", ogrupo.Estado));

                cmd.Parameters.Add(new SqlParameter("@CodigoGrupo", ogrupo.CodigoGrupo));

                await cmd.ExecuteNonQueryAsync();
            }
        }


        public async Task EditarGrupoAsync(Grupo ogrupo)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarGrupo", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Grupo", ogrupo.Cod_Grupo));
                

                cmd.Parameters.Add(new SqlParameter("@Cod_Docente", ogrupo.Cod_Docente));

                cmd.Parameters.Add(new SqlParameter("@Cupo", ogrupo.Cupo));

                cmd.Parameters.Add(new SqlParameter("@Estado", ogrupo.Estado));

                cmd.Parameters.Add(new SqlParameter("@CodigoGrupo", ogrupo.CodigoGrupo));
                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarGrupoAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarGrupo", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Grupo", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

        

        
    } 
}
