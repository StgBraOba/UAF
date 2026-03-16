using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignaturaController : ControllerBase
    {
       

        private readonly AsignaturaServices _services;

        public AsignaturaController(AsignaturaServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaClase()
        {
            try
            {
                var lista = await _services.ListarAsignatura();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevaClase")]
        public async Task<IActionResult> NuevaClase(AsignaturaDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaAsignatura(dto);
                return StatusCode(201, "Asignatura agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarAsignatura(int id, [FromBody] AsignaturaDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Asignatura)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Asignatura = id;
                await _services.EditarAsignatura(dTo);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        //Metodo Eliminas
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> ELiminarAsignatura(int id)
        {
            await _services.EliminarAsignatura(id);
            return NoContent();
        }




    }
}
