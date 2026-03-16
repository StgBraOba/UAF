using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly RolServices _services;

        public RolController(RolServices services)
        {
            _services = services;
        }

       [HttpGet]
       public async Task<IActionResult> ListarRol()
        {
            try
            {
                var lista = await _services.ListarRol();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevoRol")]
        public async Task<IActionResult> NuevoRol(RolDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevoRol(dto);
                return StatusCode(201, "Rol agregado correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarRol (int id, [FromBody] RolDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Id_Rol)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Id_Rol = id;
                await _services.EditarRol(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> EliminarRol(int id)
        {
            await _services.EliminarRol(id);
            return NoContent();
        }
    }
}
