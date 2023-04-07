using mpp1.DatabaseContext;
using mpp1.Repository;
using mpp1.Repository.Interfaces;
using mpp1.Service;
using mpp1.Service.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
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

app.UseAuthorization();

app.MapControllers();

app.Run();