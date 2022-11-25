using Backend.Domain;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infra.Data.ModelConfiguration;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.HasData(new Usuario()
        {
            Id = 1,
            Nome = "Administrador",
            Email = "admin@gmail.com",
            Senha = PasswordEncripty.Encripty("123456"),
            Nivel = 9,
        });
    }
}