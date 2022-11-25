using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private IClienteService _service;

        public ClienteController(IClienteService service)
        {
            _service = service;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ClienteDTO[]))]
        public async Task<IActionResult> Get()
        {
            var clientesDto = await _service.Get<ClienteDTO>();

            return Ok(clientesDto);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ClienteDTO))]
        public async Task<IActionResult> GetById(int id)
        {
            var clienteDto = await _service.GetById<ClienteDTO>(id);

            if (clienteDto == null)
                return NotFound();

            return Ok(clienteDto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClienteCreateDTO clienteDto)
        {
            var cliente = await _service.Add<ClienteCreateDTO, ClienteDTO>(clienteDto);

            return CreatedAtAction(nameof(GetById), new { id = cliente.Id }, cliente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ClienteCreateDTO clienteDto)
        {
            var vbOk = await _service.Update(id, clienteDto);

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
