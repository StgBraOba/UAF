using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UAF.Application.DTos;
using UAF.Application.Services;

namespace UAF.Presentation.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioServices _services;

        public UsuarioController(UsuarioServices services)
        {
            _services = services;
        }

       
        [HttpGet]
        public async Task<IActionResult> ListarUsuario()
        {
            try
            {
                var lista = await _services.ListarUsuario();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        
        [HttpPost("NuevoUsuario")]
        public async Task<IActionResult> NuevoUsuario(UsuarioDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevoUsuario(dto);
                return StatusCode(201, "Usuario agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        
        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarUsuario(int id, [FromBody] UsuarioDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Id_Usuario)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Id_Usuario = id;
                await _services.EditarUsuario(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

       
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> EliminarUsuario(int id)
        {
            await _services.EliminarUsuarion(id);
            return NoContent();
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> UsuarioPorId(int id)
        {
            var usuario = await _services.ListarPorId(id);

            if (usuario == null)
                return NotFound();

            return Ok(usuario);
        }


        [HttpGet("test-bcrypt")]
        public IActionResult TestBcrypt()
        {
            string password = "12345";

            string hash = BCrypt.Net.BCrypt.HashPassword(password);

            bool resultado = BCrypt.Net.BCrypt.Verify(password, hash);



            return Ok(new
            {
                password = password,
                hash = hash,
                verify = resultado
            });
        }
    }
}
