using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace UAF.Infrastructure.DataBase
{
    public class DBUniv
    {
        private readonly string _connectionstring;

        public DBUniv(string connectionstring)
        {
            _connectionstring = connectionstring;
        }

        public SqlConnection CreateConnection()
        {
            return new SqlConnection(_connectionstring);
        }
    }
}
