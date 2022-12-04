using Backend.Application.Interfaces;
using Backend.Application.Services;
using Backend.Domain.Interfaces;
using Backend.Infra.Data.Context;
using Backend.Infra.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Backend.Infra.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("CloudSqlConn");
            var serverVersion = ServerVersion.AutoDetect(connectionString);

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseMySql(connectionString, serverVersion);
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient<IClienteService, ClienteService>();
            services.AddTransient<IProcedimentoService, ProcedimentoService>();
            services.AddTransient<IAgendamentoService, AgendamentoService>();
            services.AddTransient<IUsuarioService, UsuarioService>();
            services.AddTransient<ILoggedUser, LoggedUser>();

            services.AddTransient<IClienteRepository, ClienteRepository>();
            services.AddTransient<IProcedimentoRepository, ProcedimentoRepository>();
            services.AddTransient<IAgendamentoRepository, AgendamentoRepository>();
            services.AddTransient<IUsuarioRepository, UsuarioRepository>();

            return services;
        }

        public static void InitializeDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>()!.CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
            }
        }

        public static void AddAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidIssuer = configuration["Jwt:Issuer"],
                            ValidAudience = configuration["Jwt:Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)),
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            RequireExpirationTime = true,
                            ClockSkew = TimeSpan.Zero
                        };
                    });

            services.AddAuthorization(options =>
            {
                options.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser()
                                                                         .Build();
            });
        }
    }
}