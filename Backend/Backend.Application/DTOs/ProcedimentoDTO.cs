using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    public class ProcedimentoDTO
    {
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        [StringLength(100, ErrorMessage = "Limite de 100 caracteres do campo Nome ultrapassado")]
        public string? Nome { get; set; }

        public decimal Valor { get; set; }

        public decimal CustoMaterial { get; set; }

        public decimal CustoFixo { get; set; }
    }

    public class ProcedimentoCreateDTO
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        [StringLength(100, ErrorMessage = "Limite de 100 caracteres do campo Nome ultrapassado")]
        public string? Nome { get; set; }

        public decimal Valor { get; set; }

        public decimal CustoMaterial { get; set; }

        public decimal CustoFixo { get; set; }
    }
}