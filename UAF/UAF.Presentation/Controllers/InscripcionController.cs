using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InscripcionController : ControllerBase
    {
        private readonly InscripcionServices _services;

        public InscripcionController(InscripcionServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaInscripcion()
        {
            try
            {
                var lista = await _services.ListaInscripcion();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevaInscripcion")]
        public async Task<IActionResult> NuevaInscripcion(InscripcionDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaInscripcion(dto);
                return StatusCode(201, "Inscripcion agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarInscripcion(int id, [FromBody] InscripcionDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Inscripcion)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Inscripcion = id;
                await _services.EditarInscripcion(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> ELiminarInscripcion(int id)
        {
            await _services.EliminarInscripcion(id);
            return NoContent();
        }
    }
}
