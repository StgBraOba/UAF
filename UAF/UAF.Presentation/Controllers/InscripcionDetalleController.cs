using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InscripcionDetalleController : ControllerBase
    {
        private readonly InscripcionDetalleServices _services;

        public InscripcionDetalleController(InscripcionDetalleServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListarInscripcionDetalle()
        {
            try
            {
                var lista = await _services.ListarInscripcionDetealle();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevaInscripcionDetalle")]
        public async Task<IActionResult> NuevaInscripcionDetalle(InscripcionDetalleDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaInscripcionDetalle(dto);
                return StatusCode(201, "InscripcionDetalle agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarInscripcionDetalle(int id, [FromBody] InscripcionDetalleDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_InscripcionDetalle)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_InscripcionDetalle = id;
                await _services.EditarInscripcionDetalle(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> ELiminarInscripcionDetalle(int id)
        {
            await _services.EliminarInscripcionDetalle(id);
            return NoContent();
        }

    }
}
