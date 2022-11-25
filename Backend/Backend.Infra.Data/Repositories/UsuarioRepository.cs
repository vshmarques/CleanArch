using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infra.Data.Repositories;

public class UsuarioRepository : RepositoryBase<Usuario>, IUsuarioRepository
{
    private readonly AppDbContext _db;

    public UsuarioRepository(AppDbContext db) : base(db, db.Usuarios)
    {
        _db = db;
	}

    public override Task<Usuario> Add(Usuario entity)
    {
        entity.Senha = PasswordEncripty.Encripty(entity.Senha!);
        return base.Add(entity);
    }

    public override Task<bool> Update(Usuario entity)
    {
        entity.Senha = PasswordEncripty.Encripty(entity.Senha!);
        return base.Update(entity);
    }

    public async Task<Usuario?> GetByEmailPassword(string? email, string password)
    {
        return await _db.Usuarios.Where(x => x.Email == email && x.Senha == password).FirstOrDefaultAsync();
    }

    public async Task<Usuario?> GetByEmail(string email)
    {
        return await _db.Usuarios.Where(x => x.Email == email).FirstOrDefaultAsync();
    }
}