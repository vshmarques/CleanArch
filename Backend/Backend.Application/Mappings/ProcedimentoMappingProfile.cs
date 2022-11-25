using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class ProcedimentoMappingProfile : Profile
    {
        public ProcedimentoMappingProfile()
        {
            CreateMap<ProcedimentoDTO, Procedimento>().ReverseMap();
            CreateMap<ProcedimentoCreateDTO, Procedimento>().ReverseMap();
        }
    }
}