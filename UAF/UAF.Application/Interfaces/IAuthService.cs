using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UAF.Application.DTos;

namespace UAF.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> Login(LogInDTO request);
    }
}
