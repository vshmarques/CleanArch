using Backend.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities
{
    public class Procedimento : IFilterUserBase
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        [StringLength(100, ErrorMessage = "Limite de 100 caracteres do campo Nome ultrapassado")]
        public string? Nome { get; set; }

        [Precision(8, 2)]
        public decimal Valor { get; set; }

        [Precision(8, 2)]
        public decimal CustoMaterial { get; set; }

        [Precision(8, 2)]
        public decimal CustoFixo { get; set; }
    }
}
