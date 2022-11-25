using System.Linq.Expressions;

namespace Backend.Domain.Interfaces;

public interface IRepositoryBase<T>
{
    Task<IEnumerable<T>> Get();

    Task<IEnumerable<T>> Get(Expression<Func<T, object>>[] includes);

    Task<T> GetById(int id);

    Task<T> GetById(int id, Expression<Func<T, object>>[] includes);

    Task<T> Add(T entity);

    Task<bool> Update(T entity);

    Task<bool> Delete(T entity);

    Task<bool> Save();
}