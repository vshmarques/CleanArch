using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;

namespace Backend.Infra.Data.Repositories;

public class AgendamentoRepository : RepositoryFilterUserBase<Agendamento>, IAgendamentoRepository
{
    private readonly AppDbContext _db;

    public AgendamentoRepository(AppDbContext db, ILoggedUser loggedUser) : base(db, db.Agendamentos, loggedUser)
    {
        _db = db;
    }

    public override async Task<IEnumerable<Agendamento>> Get()
    {
        return await base.Get(x => x.Cliente, x => x.Procedimento);
    }

    public override async Task<Agendamento> GetById(int id)
    {
        return await base.GetById(id, x => x.Cliente, x => x.Procedimento);
    }
}