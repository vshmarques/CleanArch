using Backend.Infra.IoC;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyOrigin()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new Backend.Api.Converters.DateTimeConverter()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
DependencyInjection.AddAuthentication(builder.Services, builder.Configuration);
DependencyInjection.AddInfrastructure(builder.Services, builder.Configuration);

var app = builder.Build();

DependencyInjection.InitializeDatabase(app);

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();