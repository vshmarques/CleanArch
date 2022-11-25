using System.ComponentModel.DataAnnotations;
using Backend.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Entities
{
    public class Agendamento : IFilterUserBase
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        public DateTime DataInicio { get; set; }
        
        public DateTime DataFim { get; set; }

        public bool Confirmado { get; set; } = false;
        
        public bool Pago { get; set; } = false;

        [Precision(8, 2)]
        public decimal Valor { get; set; }

        [Precision(8, 2)]
        public decimal CustoMaterial { get; set; }

        [Precision(8, 2)]
        public decimal CustoFixo { get; set; }

        [Required]
        public int ClienteId { get; set; }

        [Required]
        public int ProcedimentoId { get; set; }

        public virtual Cliente? Cliente { get; set; }
        
        public virtual Procedimento? Procedimento { get; set; }
    }
}
