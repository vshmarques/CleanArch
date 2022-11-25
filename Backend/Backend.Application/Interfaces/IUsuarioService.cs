using Backend.Domain.Entities;

namespace Backend.Application.Interfaces;

public interface IUsuarioService : IServiceBase<Usuario>
{
    Task<Usuario?> GetByEmailPassword(string? email, string password);
}