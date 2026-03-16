using UAF.Application.DTos;
using UAF.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UAF.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrupoController : ControllerBase
    {
        private readonly GrupoServices _services;

        public GrupoController(GrupoServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListaGrupo()
        {
            try
            {
                var lista = await _services.ListaGrupo();
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPost("NuevoGrupo")]
        public async Task<IActionResult> NuevaGrupo(GrupoDTos dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                await _services.NuevaGrupo(dto);
                return StatusCode(201, "Grupo agregada correctamente");
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server Error" + ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditarCarrera(int id, [FromBody] GrupoDTos dTo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { msj = "El modelo no es valido" });
                }
                if (id != dTo.Cod_Grupo)
                {
                    return BadRequest(new { msj = "El Id no coincide" });
                }

                dTo.Cod_Grupo = id;
                await _services.EditarGrupo(dTo);
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
            await _services.EliminarGrupo(id);
            return NoContent();
        }
    }
}
