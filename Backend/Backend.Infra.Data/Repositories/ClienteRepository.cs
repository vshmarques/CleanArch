using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;

namespace Backend.Infra.Data.Repositories
{
    public class ClienteRepository : RepositoryFilterUserBase<Cliente>, IClienteRepository
    {
        public ClienteRepository(AppDbContext db, ILoggedUser loggedUser) : base(db, db.Clientes, loggedUser)
        {
        }
    }
}