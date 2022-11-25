using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class ClienteMappingProfile : Profile
    {
        public ClienteMappingProfile()
        {
            CreateMap<ClienteDTO, Cliente>().ReverseMap();
            CreateMap<ClienteCreateDTO, Cliente>().ReverseMap();
        }
    }
}