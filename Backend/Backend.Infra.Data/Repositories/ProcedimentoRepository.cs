using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;

namespace Backend.Infra.Data.Repositories;

public class ProcedimentoRepository : RepositoryFilterUserBase<Procedimento>, IProcedimentoRepository
{
    public ProcedimentoRepository(AppDbContext db, ILoggedUser loggedUser) : base(db, db.Procedimentos, loggedUser)
    {
    }
}