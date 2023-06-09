using Microsoft.EntityFrameworkCore;
using mpp1.Model;

namespace mpp1.DatabaseContext;

public class RentACarDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public RentACarDbContext(DbContextOptions<RentACarDbContext> options, IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<Client> Clients { get; set; } = null!;
    public virtual DbSet<Incident> Incidents { get; set; } = null!;
    public virtual DbSet<Vehicle> Vehicles { get; set; } = null!;
    public virtual DbSet<VehicleRent> VehicleRents { get; set; } = null!;
    public virtual DbSet<User> Users { get; set; } = null!;
    public virtual DbSet<UserProfile> UserProfiles { get; set; } = null!;
    public virtual DbSet<TokenValidationUser> TokenValidationUser { get; set; } = null!;
    public virtual DbSet<Message> Messages { get; set; } = null!;
    public virtual DbSet<Preferences> Preferences { get; set; } = null!;
    
    
    
}