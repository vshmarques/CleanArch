using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces;

public interface IUsuarioRepository : IRepositoryBase<Usuario>
{
    Task<Usuario?> GetByEmailPassword(string? email, string password);
    
    Task<Usuario?> GetByEmail(string email);
}