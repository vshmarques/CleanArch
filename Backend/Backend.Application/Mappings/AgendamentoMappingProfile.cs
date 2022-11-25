using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class AgendamentoMappingProfile : Profile
    {
        public AgendamentoMappingProfile()
        {
            CreateMap<AgendamentoDTO, Agendamento>().ReverseMap();
            CreateMap<AgendamentoCreateDTO, Agendamento>().ReverseMap();
        }
    }
}