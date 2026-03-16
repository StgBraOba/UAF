using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultadController : ControllerBase
    {
        private readonly FacultadServices _services;

        public FacultadController(FacultadServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaFacultad()
        {
            try
            {
                var lista = await _services.ListarFacultad();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevaFacultad")]
        public async Task<IActionResult> NuevaFacultad(FacultadDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaFacultad(dto);
                return StatusCode(201, "Facultad agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarFacultad(int id, [FromBody] FacultadDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Facultad)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Facultad = id;
                await _services.EditarFacultad(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> EliminarFacultad(int id)
        {
            await _services.EliminarFacultad(id);
            return NoContent();
        }
    }
}
