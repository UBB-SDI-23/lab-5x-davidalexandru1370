using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using mpp1.DatabaseContext;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Repository.Interfaces;

namespace mpp1.Repository;

public class VehicleRentRepository : IVehicleRentRepository
{
    private RentACarDbContext _rentACarDbContext;

    public VehicleRentRepository(RentACarDbContext rentACarDbContext)
    {
        _rentACarDbContext = rentACarDbContext;
    }

    public async Task AddVehicleRent(VehicleRent vehicleRent)
    {
        _rentACarDbContext.VehicleRents.Add(vehicleRent);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task DeleteVehicleRent(Guid vehicleRentId)
    {
        var foundVehicleRent = await GetVehicleRentById(vehicleRentId);
        _rentACarDbContext.Remove(foundVehicleRent);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task<VehicleRent> UpdateVehicleRent(VehicleRent vehicleRent)
    {
        if (vehicleRent is null)
        {
            throw new RepositoryException("Invalid vehicle rent!");
        }

        var foundVehicleRent = await GetVehicleRentById(vehicleRent.Id);

        _rentACarDbContext.Entry(foundVehicleRent).CurrentValues.SetValues(vehicleRent);
        await _rentACarDbContext.SaveChangesAsync();

        return vehicleRent;
    }
    
    /*
     * SELECT V.* From VehiclesRent VR
     * WHERE VR.clientId = @clientId
     * LEFT JOIN Vehicles V on V.Id = VR.vehicleId 
     */
    
    public Task<IEnumerable<Vehicle>> GetVehiclesByClientId(Guid clientId)
    {
        var result = (
            from VR in _rentACarDbContext.VehicleRents
            where VR.ClientId == clientId
            join V in _rentACarDbContext.Vehicles on VR.VehicleId equals V.Id
            select V
        ) as IEnumerable<Vehicle>;
            
        return Task.FromResult(result);
    }

    public Task<IEnumerable<Client>> GetClientsByVehicleId(Guid vehicleId)
    {
        var result = (
            from VR in _rentACarDbContext.VehicleRents
            where VR.VehicleId == vehicleId
            join C in _rentACarDbContext.Clients on VR.ClientId equals C.Id
            select C
        ) as IEnumerable<Client>;
        return Task.FromResult(result);
    }

    public Task<IEnumerable<VehicleRent>> GetAllRents()
    {
        var result = _rentACarDbContext.VehicleRents.ToList() as IEnumerable<VehicleRent>;
        return Task.FromResult(result);
    }

    public async Task<VehicleRent> GetVehicleRentById(Guid vehicleRentId)
    {
        var result = await _rentACarDbContext.VehicleRents
            .Where(vr => vr.Id == vehicleRentId).FirstOrDefaultAsync();
        if (result is null)
        {
            throw new RepositoryException($"Vehicle with Id={vehicleRentId} does not exists!");
        }
        return result;
    }
}