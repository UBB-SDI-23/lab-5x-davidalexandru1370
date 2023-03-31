using System.Data;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using mpp1.DatabaseContext;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Repository.Interfaces;

namespace mpp1.Repository;

public class VehicleRepository : IVehicleRepository
{
    private readonly RentACarDbContext _rentACarDbContext;

    public VehicleRepository(RentACarDbContext rentACarDbContext)
    {
        _rentACarDbContext = rentACarDbContext;
    }

    public async Task AddVehicle(Vehicle vehicle)
    {
        await _rentACarDbContext.AddAsync(vehicle);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task<Vehicle> UpdateVehicle(Vehicle vehicle)
    {
        if (vehicle is null)
        {
            throw new RepositoryException("Invalid vehicle");
        }

        var foundVehile = _rentACarDbContext.Vehicles.FirstOrDefault(v => v.Id == vehicle.Id);
        
        if (foundVehile is null)
        {
            throw new RepositoryException($"Vehicle with Id={vehicle.Id} does not exists!");
        }

        _rentACarDbContext.Entry(foundVehile).CurrentValues.SetValues(vehicle);
        await _rentACarDbContext.SaveChangesAsync();
        return vehicle;
    }

    public async Task RemoveVehicle(Guid id)
    {
        var vehicle = _rentACarDbContext.Vehicles.FirstOrDefault(v => v.Id == id);
        if (vehicle is null)
        {
            throw new RepositoryException($"Vehicle with Id={id} does not exists!");
        }
       
        _rentACarDbContext.Remove(vehicle);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public Task<Vehicle> GetByVehicleIdWithAllData(Guid vehicleId)
    {
        var result = _rentACarDbContext.Set<Vehicle>().Where(v => v.Id == vehicleId).Include(v => v.Incidents) .FirstOrDefault();
        if (result is null)
        {
            throw new RepositoryException($"vehicle with id={vehicleId} does not exists!");
        }

        return Task.FromResult(result);
    }

    public  Task<IEnumerable<Vehicle>> GetAllVehicles()
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
}