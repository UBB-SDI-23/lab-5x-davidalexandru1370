using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using mpp1.DatabaseContext;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Model.DTO;
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
        try
        {
            _rentACarDbContext.VehicleRents.Add(vehicleRent);
            await _rentACarDbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new RepositoryException(e.Message);
        }
    }

    public async Task DeleteVehicleRent(VehicleRent vehicleRent)
    {
        var foundVehicleRent = await GetVehicleRentById(vehicleRent.Id);
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

        var vehicleRentWithAllData = await GetVehicleRentById(foundVehicleRent.Id);
        return vehicleRentWithAllData;
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
            .Where(vr => vr.Id == vehicleRentId)
            .Include(x => x.Vehicle)
            .Include(x => x.Client)
            .FirstOrDefaultAsync();
        if (result is null)
        {
            throw new RepositoryException($"Vehicle with Id={vehicleRentId} does not exists!");
        }

        return result;
    }

    public Task<Pagination<VehicleRentDto>> GetVehicleRentsPaginated(int skip, int take)
    {
        Pagination<VehicleRentDto> paginatedRents = new();

        var result = _rentACarDbContext
                .Set<VehicleRent>()
                .Skip(skip)
                .Take(take)
                .Include(r => r.User)
                .Include(r => r.Client)
                .Include(r => r.Vehicle)
            as IEnumerable<VehicleRent>;

        paginatedRents.Elements = result.Select(v => new VehicleRentDto()
        {
            ClientId = v.Client!.Id,
            VehicleId = v.Vehicle!.Id,
            Client = v.Client,
            Vehicle = v.Vehicle,
            Id = v.Id,
            Comments = v.Comments,
            EndDate = v.EndDate,
            Owner = new Owner()
            {
                UserId = v.User.Id,
                Username = v.User!.Name
            },
            StartDate = v.StartDate,
            TotalCost = v.TotalCost
            
        });

        int numberOfRents = GetNumberOfRents();
        paginatedRents.TotalNumberOfElements = numberOfRents;

        return Task.FromResult(paginatedRents);
    }

    public int GetNumberOfRents()
    {
        return _rentACarDbContext.Set<VehicleRent>().Count();
    }

    public async Task<int> GetNumberOfRentsByClientId(Guid clientId)
    {
        return (await GetVehiclesByClientId(clientId)).Count();
    }

    public Task<int> GetNumberOfRentsByOwner(string owner)
    {
        var count = _rentACarDbContext
            .Set<VehicleRent>()
            .Include(c => c.User)
            .Count(c => c.User.Name == owner);

        return Task.FromResult(count);
    }
}