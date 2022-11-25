namespace Backend.Application.Interfaces
{
    public interface IServiceBase<T> where T : class
    {
        Task<IEnumerable<D>> Get<D>();

        Task<D> GetById<D>(int id);

        Task<Output> Add<Input, Output>(Input itemDto);

        Task<bool> Update<Input>(int id, Input itemDto);

        Task<bool> Delete(int id);
    }
}