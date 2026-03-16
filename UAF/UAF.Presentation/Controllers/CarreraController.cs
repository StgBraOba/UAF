using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarreraController : ControllerBase
    {
        private readonly CarreraServices _services;

        public CarreraController(CarreraServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaCarrera()
        {
            try
            {
                var lista = await _services.ListaCarrera();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevaCarrera")]
        public async Task<IActionResult> NuevaCarrera(CarreraDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaCarrera(dto);
                return StatusCode(201, "Carrera agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarCarrera(int id, [FromBody] CarreraDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Carrera)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Carrera = id;
                await _services.EditarCarrera(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> ELiminarCarrera(int id)
        {
            await _services.EliminarCarrera(id);
            return NoContent();
        }
    }
}
