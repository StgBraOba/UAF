using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UAF.Application.DTos
{
    public class AuthResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }

        public AuthResponseDTO(bool success, string message = null, string token = null)
        {
            Success = success;
            Message = message;
            Token = token;
        }
    }
}
