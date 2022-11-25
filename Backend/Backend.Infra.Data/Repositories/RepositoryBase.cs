using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend.Infra.Data.Repositories;

public class RepositoryBase<T> : IRepositoryBase<T> where T : class
{
    private readonly AppDbContext _db;
    private readonly DbSet<T> _dbSet;

    public RepositoryBase(AppDbContext db, DbSet<T> dbSet)
    {
        _db = db;
        _dbSet = dbSet;
    }

    public virtual async Task<IEnumerable<T>> Get()
    {
        return await _dbSet.ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> Get(params Expression<Func<T, object>>[] includes)
    {
        var qry = _dbSet.AsQueryable();

        qry = includes.Aggregate(qry, (current, include) => current.Include(include));

        return await qry.ToListAsync();
    }

    public virtual async Task<T> GetById(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task<T> GetById(int id, params Expression<Func<T, object>>[] includes)
    {
        var keyProperty = _db.Model.FindEntityType(typeof(T))!.FindPrimaryKey()!.Properties.Single();        

        var qry = _dbSet.Where(e => EF.Property<int>(e, keyProperty.Name) == id).AsQueryable();

        qry = includes.Aggregate(qry, (current, include) => current.Include(include));
        
        return await qry.FirstOrDefaultAsync();
    }

    public virtual async Task<T> Add(T entity)
    {
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
        return await _dbSet.FirstOrDefaultAsync(predicate);
    }
}