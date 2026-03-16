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


    public class DocenteRepository : IEnumerableDocente
    {

        private readonly DBUniv _connectinstring;
        public DocenteRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }

        public async Task<IEnumerable<Docente>> ListarDocenteAsync()
        {
            var olist = new List<Docente>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarDocente", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Docente
                        {
                            Cod_Docente = Convert.ToInt32(dr["Cod_Docente"]),
                            Nombre = dr["Nombre"].ToString(),
                            Apellido = dr["Apellido"].ToString(),
                            Edad = Convert.ToInt32(dr["Edad"]),
                            Direccion = dr["Direccion"].ToString(),
                            Estado = dr["Estado"].ToString(),
                            Id_Usuario = Convert.ToInt32(dr["Id_Usuario"])
                        });
                    }
                }
                return olist;
            }
        }

        public async Task<IEnumerable<Docente>> ListarDocentePorNombreAsync(string Buscar)
        {
            var olist = new List<Docente>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarDocentePorNombre", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Nombre", Buscar));
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Docente
                        {
                            Cod_Docente = Convert.ToInt32(dr["Cod_Docente"]),
                            Nombre = dr["Nombre"].ToString(),
                            Apellido = dr["Apellido"].ToString(),
                            Edad = Convert.ToInt32(dr["Edad"]),
                            Direccion = dr["Direccion"].ToString(),
                            Estado = dr["Estado"].ToString(),
                            Id_Usuario = Convert.ToInt32(dr["Id_Usuario"])
                        });
                    }
                }
                return olist;
            }
        }


        public async Task NuevoDocente(Docente odocente)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearDocente", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Nombre", odocente.Nombre));
                cmd.Parameters.Add(new SqlParameter("@Apellido", odocente.Apellido));
                cmd.Parameters.Add(new SqlParameter("@Edad", odocente.Edad));
                cmd.Parameters.Add(new SqlParameter("@Direccion", odocente.Direccion));
                cmd.Parameters.Add(new SqlParameter("@Estado", odocente.Estado));
                cmd.Parameters.Add(new SqlParameter("@Id_Usuario", odocente.Id_Usuario));

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EditarDocente(Docente odocente)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarDocente", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Docente", odocente.Cod_Docente));
                cmd.Parameters.Add(new SqlParameter("@Nombre", odocente.Nombre));
                cmd.Parameters.Add(new SqlParameter("@Apellido", odocente.Apellido));
                cmd.Parameters.Add(new SqlParameter("@Edad", odocente.Edad));
                cmd.Parameters.Add(new SqlParameter("@Direccion", odocente.Direccion));
                cmd.Parameters.Add(new SqlParameter("@Estado", odocente.Estado));
                cmd.Parameters.Add(new SqlParameter("@Id_Usuario", odocente.Id_Usuario));
                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarDocente(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarDocente", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Docente", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

        

        
    }
}
