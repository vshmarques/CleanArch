using Backend.Api.Filters;
using Backend.Application.DTOs;
using Backend.Application.Exceptions;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;

namespace Backend.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[TypeFilter(typeof(AdminFilter))]
public class UsuarioController : ControllerBase
{
    private IUsuarioService _service;

    public UsuarioController(IUsuarioService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UsuarioDTO[]))]
    public async Task<IActionResult> Get()
    {
        var usuariosDto = await _service.Get<UsuarioDTO>();

        return Ok(usuariosDto);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UsuarioDTO))]
    public async Task<IActionResult> GetById(int id)
    {
        var usuarioDto = await _service.GetById<UsuarioDTO>(id);

        if (usuarioDto == null)
            return NotFound();

        return Ok(usuarioDto);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UsuarioCreateDTO usuarioDto)
    {
        try
        {
            var usuario = await _service.Add<UsuarioCreateDTO, UsuarioDTO>(usuarioDto);

            return CreatedAtAction(nameof(GetById), new { id = usuario.Id }, usuario);
        }
        catch (BadRequestException ex)
        {
            dynamic error = new ExpandoObject();
            error.message = ex.Message;
            return BadRequest(error);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] UsuarioCreateDTO usuarioDto)
    {
        var vbOk = await _service.Update(id, usuarioDto);

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