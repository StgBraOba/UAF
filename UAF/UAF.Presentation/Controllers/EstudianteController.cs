using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly EstudianteServices _services;

        public EstudianteController(EstudianteServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaEstudiante()
        {
            try
            {
                var lista = await _services.ListaEstudiante();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevoEstudiante")]
        public async Task<IActionResult> NuevoEstudiante(EstudianteDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaEstudiante(dto);
                return StatusCode(201, "Estudiante agregado correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarEstudiante(int id, [FromBody] EstudianteDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Estudiante)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Estudiante = id;
                await _services.EditarEstudiante(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> ELiminarEstudiante(int id)
        {
            await _services.EliminarEstudiante(id);
            return NoContent();
        }
    }
}
