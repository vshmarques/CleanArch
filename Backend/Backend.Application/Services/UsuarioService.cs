using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Exceptions;
using Backend.Application.Interfaces;
using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services;

public class UsuarioService : ServiceBase<Usuario>, IUsuarioService
{
    private readonly IUsuarioRepository _repository;
    private readonly IMapper _mapper;

    public UsuarioService(IUsuarioRepository repository, IMapper mapper) : base(repository, mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<Usuario?> GetByEmailPassword(string? email, string password)
    {
        return await _repository.GetByEmailPassword(email, PasswordEncripty.Encripty(password));
    }

    public override async Task<Output> Add<Input, Output>(Input itemDto)
    {
        var usuario = await _repository.GetByEmail((itemDto as UsuarioCreateDTO)?.Email);

        if (usuario != null)
            throw new BadRequestException("Email já cadastrado");

        return await base.Add<Input, Output>(itemDto);
    }
}