using Backend.Application.DTOs;
using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private IUsuarioService _usuarioService;

        public AuthController(IConfiguration configuration,
                              IUsuarioService usuarioService)
        {
            _configuration = configuration;
            _usuarioService = usuarioService;
        }

        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResponse))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(AuthResponse))]
        public async Task<IActionResult> Auth(AuthRequest user)
        {
            var response = new AuthResponse();

            var usuario = await _usuarioService.GetByEmailPassword(user.username!, user.password!);

            if (usuario == null)
            {
                response.message = "Invalid credentials";
                return Unauthorized(response);
            }

            if (usuario.Bloqueado)
            {
                response.message = "User is blocked";
                return Unauthorized(response);
            }

            dynamic userPayload = new ExpandoObject();
            userPayload.id = usuario.Id;
            userPayload.name = usuario.Nome;
            userPayload.level = usuario.Nivel;

            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.username!),
                    new Claim(JwtRegisteredClaimNames.Email, user.username!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("user", JsonConvert.SerializeObject(userPayload))
                }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            response.token = jwtToken;

            return Ok(response);
        }

        [HttpPost("passwordChange")]
        public async Task<IActionResult> PasswordChange(PasswordChangeRequest request)
        {
            var email = HttpContext.User.Claims.Where(x => x.Properties.Values.Contains("email")).FirstOrDefault();
            Usuario? usuario = await _usuarioService.GetByEmailPassword(email?.Value, request.oldPassword!);

            if (usuario == null)
                return BadRequest(new { message = "Wrong current password"});

            usuario.Senha = request.newPassword;
            await _usuarioService.Update(usuario.Id, usuario);

            return NoContent();
        }
    }
}