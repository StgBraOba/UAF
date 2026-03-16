using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UAF.Application.DTos;
using UAF.Application.Services;

namespace UAF.Presentation.Controllers
{
    [Authorize(Roles = "Admin,Docente")]
    [Route("api/[controller]")]
    [ApiController]
    public class CalificacionController : ControllerBase
    {
        private readonly CalificacionServices _services;

        public CalificacionController(CalificacionServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaEstudiante()
        {
            try
            {
                var lista = await _services.ListarCalificacion();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevaCalificacion")]
        public async Task<IActionResult> NuevoCalificacion(CalificacionDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaCalificacion(dto);
                return StatusCode(201, "Calificacion agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarCalificacion(int id, [FromBody] CalificacionDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Calificaion)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Calificaion = id;
                await _services.EditarCalificacion(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> ELiminarCalificacion(int id)
        {
            await _services.EliminarCalificacion(id);
            return NoContent();
        }
    }
}
