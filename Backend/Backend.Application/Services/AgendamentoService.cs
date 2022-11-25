using AutoMapper;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class AgendamentoService : ServiceBase<Agendamento>, IAgendamentoService
    {
        private readonly IAgendamentoRepository _repository;
        private readonly IMapper _mapper;

        public AgendamentoService(IAgendamentoRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
    }
}