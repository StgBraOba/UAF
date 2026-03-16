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
    public class InscripcionRepository : IEnumerableInscripcion
    {
        private readonly DBUniv _connectinstring;
        public InscripcionRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }

        public async Task<IEnumerable<Inscripcion>> ListarInscripcionAsync()
        {
            var olist = new List<Inscripcion>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarInscripcion", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Inscripcion
                        {
                            Cod_Inscripcion = Convert.ToInt32(dr["Cod_Inscripcion"]),
                            Perido = dr["Perido"].ToString(),
                           // Fecha_Creacion = Convert.ToDateTime(dr["Fecha_Creacion"]),
                            Cod_Estudiante = Convert.ToInt32(dr["Cod_Estudiante"]),
                            
                        });
                    }
                }
                return olist;
            }
        }

        public Task<IEnumerable<Inscripcion>> ListarInscripcionPorNombreAsync(string Buscar)
        {
            throw new NotImplementedException();
        }




        public async Task NuevaInscripcionAsync(Inscripcion oinscripcion)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearInscripcion", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Perido", oinscripcion.Perido));

               cmd.Parameters.Add(new SqlParameter("@Fecha_Creacion", oinscripcion.Fecha_Creacion));
                cmd.Parameters.Add(new SqlParameter("@Cod_Estudiante", oinscripcion.Cod_Estudiante));

                

                await cmd.ExecuteNonQueryAsync();
            }
        }


        public async Task EditarInscripcionAsync(Inscripcion oinscripcion)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarInscripcion", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Inscripcion", oinscripcion.Cod_Inscripcion));
                cmd.Parameters.Add(new SqlParameter("@Perido", oinscripcion.Perido));
                cmd.Parameters.Add(new SqlParameter("@Cod_Estudiante", oinscripcion.Cod_Estudiante));
                
                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarInscripcionAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarInscripcion", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Inscripcion", id));


                await cmd.ExecuteNonQueryAsync();
            }



        }
    }
}
