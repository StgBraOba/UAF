using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModalidadController : ControllerBase
    {
        private readonly ModalidadServices _services;

        public ModalidadController(ModalidadServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaFacultad()
        {
            try
            {
                var lista = await _services.ListarModalidad();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevaModalidad")]
        public async Task<IActionResult> NuevaModalidad(ModalidadDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaModalidad(dto);
                return StatusCode(201, "Modalidad agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarModalidad(int id, [FromBody] ModalidadDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Modalidad)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Modalidad = id;
                await _services.EditarModalidad(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> EliminarModalidad(int id)
        {
            await _services.EliminarModalidad(id);
            return NoContent();
        }
    }
}
