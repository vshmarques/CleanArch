using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    public class AgendamentoDTO
    {
        public int Id { get; set; }

        public DateTime DataInicio { get; set; }

        public DateTime DataFim { get; set; }

        public bool Confirmado { get; set; } = false;

        public bool Pago { get; set; } = false;

        public decimal Valor { get; set; }

        public decimal CustoMaterial { get; set; }

        public decimal CustoFixo { get; set; }

        public int ClienteId { get; set; }

        public int ProcedimentoId { get; set; }

        public virtual ClienteDTO? Cliente { get; set; }

        public virtual ProcedimentoDTO? Procedimento { get; set; }
    }

    public class AgendamentoCreateDTO
    {
        public DateTime DataInicio { get; set; }

        public DateTime DataFim { get; set; }

        public bool Confirmado { get; set; } = false;

        public bool Pago { get; set; } = false;

        public decimal Valor { get; set; }

        public decimal CustoMaterial { get; set; }

        public decimal CustoFixo { get; set; }

        [Required]
        public int ClienteId { get; set; }

        [Required]
        public int ProcedimentoId { get; set; }
    }
}