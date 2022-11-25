using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings;

public class UsuarioMappingProfile : Profile
{
	public UsuarioMappingProfile()
	{
        CreateMap<UsuarioDTO, Usuario>().ReverseMap();
        CreateMap<UsuarioCreateDTO, Usuario>().ReverseMap();
    }
}