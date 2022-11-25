using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentoController : ControllerBase
    {
        private IAgendamentoService _service;

        public AgendamentoController(IAgendamentoService service)
        {
            _service = service;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AgendamentoDTO[]))]
        public async Task<IActionResult> Get()
        {
            var agendamentosDto = await _service.Get<AgendamentoDTO>();

            return Ok(agendamentosDto);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AgendamentoDTO))]
        public async Task<IActionResult> GetById(int id)
        {
            var agendamentoDto = await _service.GetById<AgendamentoDTO>(id);

            if (agendamentoDto == null)
                return NotFound();

            return Ok(agendamentoDto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AgendamentoCreateDTO agendamentoDto)
        {
            var agendamento = await _service.Add<AgendamentoCreateDTO, AgendamentoDTO>(agendamentoDto);

            return CreatedAtAction(nameof(GetById), new { id = agendamento.Id }, agendamento);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AgendamentoCreateDTO agendamentoDto)
        {
            var vbOk = await _service.Update(id, agendamentoDto);

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