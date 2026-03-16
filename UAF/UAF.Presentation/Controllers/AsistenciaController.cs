using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsistenciaController : ControllerBase
    {
        private readonly AsistenciaServices _services;

        public AsistenciaController(AsistenciaServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaAsistencia()
        {
            try
            {
                var lista = await _services.ListaAsistencia();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevaAsistencia")]
        public async Task<IActionResult> NuevaAsistencia(AsistenciaDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaAsistencia(dto);
                return StatusCode(201, "Asistencia agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarAsistencia(int id, [FromBody] AsistenciaDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Asistencia)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Asistencia = id;
                await _services.EditarAsistencia(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> ELiminarAsistencia(int id)
        {
            await _services.EliminarAsistencia(id);
            return NoContent();
        }
    }
}
