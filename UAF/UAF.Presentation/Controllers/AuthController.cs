using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UAF.Application.DTos;
using UAF.Application.Interfaces;

namespace UAF.Presentation.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //[Authorize(Roles = "Admin")]
        //[HttpGet("solo-admin")]
        //public IActionResult SoloAdmin()
        //{
        //    return Ok("Solo admin puede ver esto");
        //}
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogInDTO request)
        {
            var result = await _authService.Login(request);

            if (!result.Success)
                return Unauthorized(result.Message);

            return Ok(result);
        }
    }
}
