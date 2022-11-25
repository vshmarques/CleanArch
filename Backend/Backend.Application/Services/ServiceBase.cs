using AutoMapper;
using Backend.Application.Interfaces;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class ServiceBase<T> : IServiceBase<T> where T : class
    {
        private readonly IRepositoryBase<T> _repository;
        private readonly IMapper _mapper;

        public ServiceBase(IRepositoryBase<T> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual async Task<IEnumerable<D>> Get<D>()
        {
            var items = await _repository.Get();

            return _mapper.Map<IList<D>>(items);
        }

        public virtual async Task<D> GetById<D>(int id)
        {
            var item = await _repository.GetById(id);

            return _mapper.Map<D>(item);
        }

        public virtual async Task<Output> Add<Input, Output>(Input itemDto)
        {
            var item = _mapper.Map<T>(itemDto);

            await _repository.Add(item);

            return _mapper.Map<Output>(item);
        }

        public virtual async Task<bool> Update<D>(int id, D itemDto)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            _mapper.Map(itemDto, item);

            return await _repository.Update(item);
        }

        public virtual async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            return await _repository.Delete(item);
        }
    }
}