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
    public class InscripcionDetalleRepository : IEnumerableInscripcionDetalle
    {
        private readonly DBUniv _connectinstring;
        public InscripcionDetalleRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }
        public async Task<IEnumerable<InscripcionDetalle>> ListarInscripcionDetalleAsync()
        {
            var olist = new List<InscripcionDetalle>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarInscripcionDetalle", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new InscripcionDetalle
                        {
                            Cod_Inscripcion = Convert.ToInt32(dr["Cod_Inscripcion"]),
                            Cod_Clase = Convert.ToInt32(dr["Cod_Clase"]),
                            Cod_Grupo = Convert.ToInt32(dr["Cod_Grupo"]),

                        });
                    }
                }
                return olist;
            }
        }

        public async Task NuevaInscripcionDetalleAsync(InscripcionDetalle oinscripciondetalle)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearInscripcionDetalle", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Cod_Inscripcion", oinscripciondetalle.Cod_Inscripcion));

                cmd.Parameters.Add(new SqlParameter("@Cod_Clase", oinscripciondetalle.Cod_Clase));
                cmd.Parameters.Add(new SqlParameter("@Cod_Grupo", oinscripciondetalle.Cod_Grupo));



                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EditarInscripcionDetalleAsync(InscripcionDetalle oinscripciondetalle)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarInscripcionDetalle", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_InscripcionDetalle", oinscripciondetalle.Cod_InscripcionDetalle));
                cmd.Parameters.Add(new SqlParameter("@Cod_Inscripcion", oinscripciondetalle.Cod_Inscripcion));

                cmd.Parameters.Add(new SqlParameter("@Cod_Clase", oinscripciondetalle.Cod_Clase));
                cmd.Parameters.Add(new SqlParameter("@Cod_Grupo", oinscripciondetalle.Cod_Grupo));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarInscripcionDetalleAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarInscripcionDetalle", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_InscripcionDetalle", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

        
    }
}
