using AutoMapper;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class ProcedimentoService : ServiceBase<Procedimento>, IProcedimentoService
    {
        public ProcedimentoService(IProcedimentoRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}