using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcedimentoController : ControllerBase
    {
        private IProcedimentoService _service;

        public ProcedimentoController(IProcedimentoService service)
        {
            _service = service;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProcedimentoDTO[]))]
        public async Task<IActionResult> Get()
        {
            var procedimentosDto = await _service.Get<ProcedimentoDTO>();

            return Ok(procedimentosDto);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProcedimentoDTO))]
        public async Task<IActionResult> GetById(int id)
        {
            var procedimentoDto = await _service.GetById<ProcedimentoDTO>(id);

            if (procedimentoDto == null)
                return NotFound();

            return Ok(procedimentoDto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProcedimentoCreateDTO procedimentoDto)
        {
            var procedimento = await _service.Add<ProcedimentoCreateDTO, ProcedimentoDTO>(procedimentoDto);

            return CreatedAtAction(nameof(GetById), new { id = procedimento.Id }, procedimento);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProcedimentoCreateDTO procedimentoDto)
        {
            var vbOk = await _service.Update(id, procedimentoDto);

            if (!vbOk)
                return NotFound();
            else
                return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var vbOk = await _service.Delete(id);

            if (!vbOk)
                return NotFound();
            else
                return NoContent();
        }
    }
}