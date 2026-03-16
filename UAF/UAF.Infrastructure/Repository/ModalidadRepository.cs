using Microsoft.Data.SqlClient;
using UAF.Application;
using UAF.Application.Interfaces;
using UAF.Domain;
using UAF.Infrastructure.DataBase;
using System.Data;
using System.Reflection.Metadata;

namespace UAF.Infrastructure.Repository
{
    public class ModalidadRepository : IEnumerableModalidad
    {
        private readonly DBUniv _connectinstring;
        public ModalidadRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }

        public async Task<IEnumerable<Modalidad>> ListarModalidadAsync()
        { 
            var olist = new List<Modalidad>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarModalidad", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Modalidad
                        {
                            Cod_Modalidad = Convert.ToInt32(dr["Cod_Modalidad"]),
                            Estado = dr["Estado"].ToString(),
                            modalidad = dr["Modalidad"].ToString()
                        });
                    }
                }
                return olist;
            }
        }

        public async Task<IEnumerable<Modalidad>> ListarModalidadPorNombreAsync(string Buscar)
        {
            var olist = new List<Modalidad>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarModalidadPorNombre", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Modalidad", Buscar));
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Modalidad
                        {
                            Cod_Modalidad = Convert.ToInt32(dr["Cod_Modalidad"]),
                            Estado = dr["Estado"].ToString(),
                            modalidad = dr["Modalidad"].ToString()
                        });
                    }
                }
                return olist;
            }
        }

        public async Task NuevaModalidadAsync(Modalidad omodalidad)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearModalidad", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Estado", omodalidad.modalidad));
                cmd.Parameters.Add(new SqlParameter("@Modalidad", omodalidad.modalidad));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EditarModalidadAsync(Modalidad omodalidad)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarModalidad", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Modalidad", omodalidad.Cod_Modalidad));
                cmd.Parameters.Add(new SqlParameter("@Estado", omodalidad.modalidad));
                cmd.Parameters.Add(new SqlParameter("@Modalidad", omodalidad.modalidad));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarModalidadAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarModalidad", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Modalidad", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

       


    }
}
