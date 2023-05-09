using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using mpp1.DatabaseContext;
using mpp1.Identity;
using mpp1.Repository;
using mpp1.Repository.Interfaces;
using mpp1.Serialization;
using mpp1.Service;
using mpp1.Service.Interfaces;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter())
    );

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidIssuer = config["JwtSettings:Issuer"],
        ValidAudience = config["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtSettings:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddDbContext<RentACarDbContext>();
builder.Services.AddScoped<IVehicleService, VehicleService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IIncidentService, IncidentService>();
builder.Services.AddScoped<IIncidentsRepository, IncidentRepository>();
builder.Services.AddScoped<IVehicleRentRepository, VehicleRentRepository>();
builder.Services.AddScoped<IVehicleRentService, VehicleRentService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddTransient<IAuthorizationHandler, RolesInDbAuthorizationHandler>();

var app = builder.Build();
var frontendBaseUrl = app.Configuration.GetSection("Frontend")
    .GetSection(app.Environment.EnvironmentName)
    .GetSection("BaseUrl")
    .Value!;

app.UseCors(options =>
    options.WithOrigins(frontendBaseUrl).AllowAnyMethod().AllowAnyHeader().AllowCredentials()
);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();