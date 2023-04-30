using Microsoft.EntityFrameworkCore;
using mpp1.Model;

namespace mpp1.DatabaseContext;

public class RentACarDbContext : DbContext
{
    
    public RentACarDbContext(DbContextOptions<RentACarDbContext> options) : base(options)
    {
        
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(@"Host=localhost;Username=postgres;Password=postgres;Database=RentACar");
    }

    public virtual DbSet<Client> Clients { get; set; } = null!;
    public virtual DbSet<Incident> Incidents { get; set; } = null!;
    public virtual DbSet<Vehicle> Vehicles { get; set; } = null!;
    public virtual DbSet<VehicleRent> VehicleRents { get; set; } = null!;
    public virtual DbSet<User> Users { get; set; } = null!;
    public virtual DbSet<UserProfile> UserProfiles { get; set; } = null!;

}