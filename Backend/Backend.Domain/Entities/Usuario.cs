using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities;

public class Usuario
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required(ErrorMessage = "O campo Nome é obrigatório")]
    [StringLength(100, ErrorMessage = "Limite de 100 caracteres do campo Nome ultrapassado")]
    public string? Nome { get; set; }

    [Required(ErrorMessage = "O campo Email é obrigatório")]
    [StringLength(100, ErrorMessage = "Limite de 100 caracteres do campo Nome ultrapassado")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "O campo Senha é obrigatório")]
    public string? Senha { get; set; }

    public int Nivel { get; set; }

    public bool Bloqueado { get; set; } = false;
}
