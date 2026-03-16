using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocenteController : ControllerBase
    {


        private readonly DocenteServices _services;

        public DocenteController(DocenteServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaDocente()
        {
            try
            {
                var lista = await _services.ListarDocente();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevoDocente")]
        public async Task<IActionResult> NuevaDocente(DocenteDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaDocente(dto);
                return StatusCode(201, "Docente agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarDocente(int id, [FromBody] DocenteDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Docente)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Docente = id;
                await _services.EditarDocente(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> ELiminarDocente(int id)
        {
            await _services.EliminarDocente(id);
            return NoContent();
        }
    }
}
