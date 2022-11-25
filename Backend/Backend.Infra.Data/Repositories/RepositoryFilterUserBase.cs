using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend.Infra.Data.Repositories;

public class RepositoryFilterUserBase<T> : IRepositoryBase<T> where T : class, IFilterUserBase
{
    private readonly AppDbContext _db;
    private readonly DbSet<T> _dbSet;
    private readonly ILoggedUser _loggedUser;

    public RepositoryFilterUserBase(AppDbContext db, DbSet<T> dbSet, ILoggedUser loggedUser)
    {
        _db = db;
        _dbSet = dbSet;
        _loggedUser = loggedUser;
    }

    public virtual async Task<IEnumerable<T>> Get()
    {
        return await _dbSet.Where(x => x.UsuarioId == _loggedUser.id)
                           .ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> Get(params Expression<Func<T, object>>[] includes)
    {
        var qry = _dbSet.Where(x => x.UsuarioId == _loggedUser.id);

        qry = includes.Aggregate(qry, (current, include) => current.Include(include));

        return await qry.ToListAsync();
    }

    public virtual async Task<T> GetById(int id)
    {
        var entity = await _dbSet.FindAsync(id);

        if (entity != null && entity.UsuarioId == _loggedUser.id)
            return entity;

        return null;
    }

    public virtual async Task<T> GetById(int id, params Expression<Func<T, object>>[] includes)
    {
        var keyProperty = _db.Model.FindEntityType(typeof(T))!.FindPrimaryKey()!.Properties.Single();

        var qry = _dbSet.Where(e => EF.Property<int>(e, keyProperty.Name) == id && e.UsuarioId == _loggedUser.id);

        qry = includes.Aggregate(qry, (current, include) => current.Include(include));

        return await qry.FirstOrDefaultAsync();
    }

    public virtual async Task<T> Add(T entity)
    {
        entity.UsuarioId = _loggedUser.id;

        await _dbSet.AddAsync(entity);

        await Save();

        return entity;
    }

    public virtual async Task<bool> Update(T entity)
    {
        _dbSet.Update(entity);

        return await Save();
    }

    public virtual async Task<bool> Delete(T entity)
    {
        _dbSet.Remove(entity);

        return await Save();
    }

    public virtual async Task<bool> Save()
    {
        var changes = await _db.SaveChangesAsync();

        return changes > 0;
    }

    public async Task<T> FindByConditionAsync(Expression<Func<T, bool>> predicate)
    {
        var entity = await _dbSet.FirstOrDefaultAsync(predicate);

        if (entity != null && entity.UsuarioId == _loggedUser.id)
            return entity;

        return null;
    }
}