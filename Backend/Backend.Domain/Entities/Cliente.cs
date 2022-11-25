using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities;

public class Cliente : IFilterUserBase
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public int UsuarioId { get; set ; }

    [Required(ErrorMessage = "O campo Nome é obrigatório")]
    [StringLength(100, ErrorMessage = "Limite de 100 caracteres do campo Nome ultrapassado")]
    public string? Nome { get; set; }

    [StringLength(100, ErrorMessage = "Limite de 100 caracteres do campo Nome ultrapassado")]
    public string? Email { get; set; }

    public long? Cpf { get; set; }

    public long? Telefone { get; set; }
}