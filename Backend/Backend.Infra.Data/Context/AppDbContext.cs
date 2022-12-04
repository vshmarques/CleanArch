using Backend.Domain.Entities;
using Backend.Infra.Data.ModelConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Backend.Infra.Data.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Procedimento> Procedimentos { get; set; }
    public DbSet<Agendamento> Agendamentos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
    }
}

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        //var connectionString = "server=localhost;port=3306;userid=admin;password=admin;database=cleanarchdb;";
        var connectionString = "Server=/cloudsql/INSTANCE_CONNECTION_NAME ;User ID=DB_USER;Password=DB_PASS;Database=DB_NAME;Port=3306;SSL Mode=None;Pooling=True;Connection Protocol=Unix";
        var serverVersion = ServerVersion.AutoDetect(connectionString);

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseMySql(connectionString, serverVersion);
        return new AppDbContext(optionsBuilder.Options);
    }
}