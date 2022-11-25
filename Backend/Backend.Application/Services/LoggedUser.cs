using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Security.Claims;

namespace Backend.Application.Services;

public class LoggedUser : ILoggedUser
{
	public LoggedUser(IHttpContextAccessor context)
	{
        var identity = context?.HttpContext?.User?.Identity as ClaimsIdentity;
        if (identity == null) return;

        var user = identity.FindFirst("user");
        if (user == null) return;

        var usuario = JsonConvert.DeserializeObject<LoggedUser>(user.Value);
        if (usuario == null) return;
        
        id = usuario.id;
        name = usuario.name;
        level= usuario.level;
    }

    public int id { get; set; }
    public string name { get; set; }
    public int level { get; set; }
}