using System.Data;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using mpp1.DatabaseContext;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;

namespace mpp1.Repository;

public class VehicleRepository : IVehicleRepository
{
    private readonly RentACarDbContext _rentACarDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public VehicleRepository(RentACarDbContext rentACarDbContext, IHttpContextAccessor httpContextAccessor)
    {
        _rentACarDbContext = rentACarDbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task AddVehicle(Vehicle vehicle)
    {
        await _rentACarDbContext.AddAsync(vehicle);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task<VehicleDTO> UpdateVehicle(Vehicle vehicle)
    {
        if (vehicle is null)
        {
            throw new RepositoryException("Invalid vehicle");
        }

        var foundVehicle = _rentACarDbContext.Vehicles
            .Include(v => v.User)
            .Include(v => v.Incidents)
            .FirstOrDefault(v => v.Id == vehicle.Id);

        if (foundVehicle is null)
        {
            throw new RepositoryException($"Vehicle with Id={vehicle.Id} does not exists!");
        }


        _rentACarDbContext.Entry(foundVehicle).CurrentValues.SetValues(vehicle);
        await _rentACarDbContext.SaveChangesAsync();

        var result = new VehicleDTO()
        {
            Id = foundVehicle.Id,
            CarPlate = foundVehicle.CarPlate,
            Brand = foundVehicle.Brand,
            Owner = new Owner()
            {
                UserId = foundVehicle.User.Id,
                Username = foundVehicle.User.Name,
                Role = foundVehicle.User.Role
            },
            EngineCapacity = foundVehicle.EngineCapacity,
            FabricationDate = foundVehicle.FabricationDate,
            HorsePower = foundVehicle.HorsePower,
            NumberOfIncidents = foundVehicle.Incidents.Count,
            NumberOfSeats = foundVehicle.NumberOfSeats
        };
        return result;
    }

    public async Task RemoveVehicle(Vehicle vehicle)
    {
        var foundVehicle = _rentACarDbContext.Vehicles.FirstOrDefault(v => v.Id == vehicle.Id);
        
        if (foundVehicle is null)
        {
            throw new RepositoryException($"Vehicle does not exists!");
        }

        _rentACarDbContext.Remove(foundVehicle);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public Task<Vehicle> GetByVehicleIdWithAllData(Guid vehicleId)
    {
        var result = _rentACarDbContext.Set<Vehicle>().Where(v => v.Id == vehicleId).Include(v => v.Incidents)
            .FirstOrDefault();
        if (result is null)
        {
            throw new RepositoryException($"vehicle with id={vehicleId} does not exists!");
        }

        return Task.FromResult(result);
    }

    public Task<IEnumerable<Vehicle>> GetAllVehicles()
    {
        var vehicles = _rentACarDbContext.Vehicles.ToList() as IEnumerable<Vehicle>;
        return Task.FromResult(vehicles);
    }

    public Task<IEnumerable<Vehicle>> GetAllVehiclesWithAllData()
    {
        var vehicles = _rentACarDbContext.Set<Vehicle>().Include(v => v.Incidents) as IEnumerable<Vehicle>;
        return Task.FromResult(vehicles);
    }

    public async Task<Vehicle> GetVehicleById(Guid id)
    {
        var vehicle = await _rentACarDbContext.Vehicles.FirstOrDefaultAsync(v => v.Id == id);

        if (vehicle is null)
        {
            throw new RepositoryException($"Vehicle with Id={id} does not exists!");
        }

        return vehicle;
    }

    public Task<IEnumerable<Vehicle>> GetVehiclesFiltered(Expression<Func<Vehicle, bool>> condition)
    {
        var result = _rentACarDbContext.Vehicles.Where(condition) as IEnumerable<Vehicle>;
        return Task.FromResult(result);
    }

    public async Task<Pagination<VehicleDTO>> GetVehiclesPaginated(int skip, int take)
    {
        Pagination<VehicleDTO> paginatedRents = new();

        var result = await _rentACarDbContext.Vehicles
            .Skip(skip)
            .Take(take)
            .Include(v => v.User)
            .Include(v => v.Incidents)
            .ToListAsync();

        paginatedRents.Elements = result.Select(x => new VehicleDTO()
        {
            Id = x.Id,
            CarPlate = x.CarPlate,
            Brand = x.Brand,
            EngineCapacity = x.EngineCapacity,
            FabricationDate = x.FabricationDate,
            HorsePower = x.HorsePower,
            Owner = new Owner()
            {
                UserId = x.User.Id,
                Username = x.User.Name
            },
            NumberOfIncidents = x.Incidents is null ? 0 : x.Incidents!.Count,
            NumberOfSeats = x.NumberOfSeats
        });

        int numberOfVehicles = GetNumberOfRents();
        paginatedRents.TotalNumberOfElements = numberOfVehicles;

        return paginatedRents;
    }

    public int GetNumberOfRents()
    {
        return _rentACarDbContext.Set<Vehicle>().Count();
    }

    public Task<IEnumerable<Vehicle>> GetVehiclesByCarPlate(string carPlate)
    {
        if (carPlate is null)
        {
            throw new RepositoryException("Invalid car plate!");
        }

        const int numberOfVehicles = 15;

        var foundVehicles = _rentACarDbContext
                .Set<Vehicle>()
                .Where(v => v.CarPlate.Contains(carPlate))
                .Take(numberOfVehicles)
            as IEnumerable<Vehicle>;

        return Task.FromResult(foundVehicles);
    }

    public Task<int> GetNumberOfVehiclesByOwner(string owner)
    {
        var count = _rentACarDbContext
            .Set<Vehicle>()
            .Include(c => c.User)
            .Count(c => c.User.Name == owner);

        return Task.FromResult(count);
    }
}