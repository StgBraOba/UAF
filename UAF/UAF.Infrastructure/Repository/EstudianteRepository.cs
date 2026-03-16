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
    public class EstudianteRepository : IEnumerableEstudiante
    {
        private readonly DBUniv _connectinstring;
        public EstudianteRepository(DBUniv connectinstring)
        {
            _connectinstring = connectinstring;
        }



        public async Task<IEnumerable<Estudiante>> ListarEstudianteAsync()
        {
            var olist = new List<Estudiante>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarEstudiante", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Estudiante
                        {
                            Cod_Estudiante = Convert.ToInt32(dr["Cod_Estudiante"]),
                            Matricula = Convert.ToInt32(dr["Matricula"]),
                            Nombre = dr["Nombre"].ToString(),
                            Apellido = dr["Apellido"].ToString(),
                            Edad = Convert.ToInt32(dr["Edad"]),
                            Direccion = dr["Direccion"].ToString(),
                            Estado = dr["Estado"].ToString(),
                            Id_Usuario = Convert.ToInt32(dr["Id_Usuario"]),
                            Cod_Carrera = Convert.ToInt32(dr["Cod_Carrera"]),
                            Cod_Modalidad = Convert.ToInt32(dr["Cod_Modalidad"])
                        });
                    }
                }
                return olist;
            }

        }


        public async Task<IEnumerable<Estudiante>> ListarEstudiantePorNombreAsync(string Buscar)
        {
            var olist = new List<Estudiante>();

            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ListarEstudiantePorNombre", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Nombre", Buscar));
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        olist.Add(new Estudiante
                        {
                            Cod_Estudiante = Convert.ToInt32(dr["Cod_Estudiante"]),
                            Matricula = Convert.ToInt32(dr["Matricula"]),
                            Nombre = dr["Nombre"].ToString(),
                            Apellido = dr["Apellido"].ToString(),
                            Edad = Convert.ToInt32(dr["Edad"]),
                            Direccion = dr["Direccion"].ToString(),
                            Estado = dr["Estado"].ToString(),
                            Id_Usuario = Convert.ToInt32(dr["Id_Usuario"]),
                            Cod_Carrera = Convert.ToInt32(dr["Cod_Carrera"]),
                            Cod_Modalidad = Convert.ToInt32(dr["Cod_Modalidad"])
                        });
                    }
                }
                return olist;
            }

        }


        public async Task NuevoEstudianteAsync(Estudiante oestudiante)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("CrearEstudiante", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@Matricula", oestudiante.Matricula));
                cmd.Parameters.Add(new SqlParameter("@Nombre", oestudiante.Nombre));
                cmd.Parameters.Add(new SqlParameter("@Apellido", oestudiante.Apellido));
                cmd.Parameters.Add(new SqlParameter("@Edad", oestudiante.Edad));
                cmd.Parameters.Add(new SqlParameter("@Direccion", oestudiante.Direccion));
                cmd.Parameters.Add(new SqlParameter("@Estado", oestudiante.Estado));
                cmd.Parameters.Add(new SqlParameter("@Id_Usuario", oestudiante.Id_Usuario));
                cmd.Parameters.Add(new SqlParameter("@Cod_Carrera", oestudiante.Cod_Carrera));
                cmd.Parameters.Add(new SqlParameter("@Cod_Modalidad", oestudiante.Cod_Modalidad));
                await cmd.ExecuteNonQueryAsync();
            }

        }

        public async Task ActualizarEstudianteAsync(Estudiante oestudiante)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("ActualizarEstudiante", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Estudiante", oestudiante.Cod_Estudiante));
                cmd.Parameters.Add(new SqlParameter("@Matricula", oestudiante.Matricula));
                cmd.Parameters.Add(new SqlParameter("@Nombre", oestudiante.Nombre));
                cmd.Parameters.Add(new SqlParameter("@Apellido", oestudiante.Apellido));
                cmd.Parameters.Add(new SqlParameter("@Edad", oestudiante.Edad));
                cmd.Parameters.Add(new SqlParameter("@Direccion", oestudiante.Direccion));
                cmd.Parameters.Add(new SqlParameter("@Estado", oestudiante.Estado));
                cmd.Parameters.Add(new SqlParameter("@Id_Usuario", oestudiante.Id_Usuario));
                cmd.Parameters.Add(new SqlParameter("@Cod_Carrera", oestudiante.Cod_Carrera));
                cmd.Parameters.Add(new SqlParameter("@Cod_Modalidad", oestudiante.Cod_Modalidad));
                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task EliminarEstudianteAsync(int id)
        {
            using var con = _connectinstring.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("EliminarEstudiante", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Cod_Estudiante", id));


                await cmd.ExecuteNonQueryAsync();
            }
        }

        

        

        
    }
}
