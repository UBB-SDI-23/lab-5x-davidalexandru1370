
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;
using mpp1.Service.Interfaces;

namespace mpp1.Service;

public class VehicleRentService : IVehicleRentService
{
    private IVehicleRentRepository _vehicleRentRepository;
    private IClientService _clientService;

    public VehicleRentService(IVehicleRentRepository vehicleRentRepository, IClientService clientService)
    {
        _clientService = clientService;
        _vehicleRentRepository = vehicleRentRepository;
    }

    public async Task AddVehicleRent(VehicleRent vehicleRent)
    {
        await _vehicleRentRepository.AddVehicleRent(vehicleRent);
    }

    public async Task DeleteVehicleRent(VehicleRent vehicleRent)
    {
        await _vehicleRentRepository.DeleteVehicleRent(vehicleRent);
    }

    public async Task<VehicleRent> UpdateVehicleRent(VehicleRent vehicleRent)
    {
        var result = await _vehicleRentRepository.UpdateVehicleRent(vehicleRent);
        return result;
    }

    public Task<IEnumerable<Vehicle>> GetVehiclesByClientId(Guid clientId)
    {
        var result = _vehicleRentRepository.GetVehiclesByClientId(clientId);
        return result;
    }

    public Task<IEnumerable<Client>> GetClientsByVehicleId(Guid vehicleId)
    {
        var result = _vehicleRentRepository.GetClientsByVehicleId(vehicleId);
        return result;
    }

    public Task<IEnumerable<VehicleRent>> GetAllRents()
    {
        return _vehicleRentRepository.GetAllRents();
    }

    public async Task<VehicleRent> GetVehicleRentById(Guid vehicleRentId)
    {
        var result = await _vehicleRentRepository.GetVehicleRentById(vehicleRentId);
        return result;
    }

    public async Task<IEnumerable<ClientDTO>> GetMostActiveClients()
    {
        /*
         * SELECT C.*, Count(*) as NumberOfRents FROM Clients C
         * left join VehicleRents VR on C.id = VR.ClientId
         * GROUP BY C.Id
         * order by NumberOfRents
         */
     
        var result = (from E in await _vehicleRentRepository.GetAllRents()
                join C in await _clientService.GetAllClients() on E.ClientId equals C.Id
                group C by E.ClientId
                into g
                select new ClientDTO
                { 
                    Birthday = g.ToList()[0].Birthday,
                    CNP = g.ToList()[0].CNP,
                    Name = g.ToList()[0].Name,
                    Nationality = g.ToList()[0].Nationality,
                    CardNumber = g.ToList()[0].CardNumber,
                    NumberOfRents = g.Count()
                }
            ).OrderByDescending(x => x.NumberOfRents);

        return result;
    }
    
    public async  Task<Pagination<VehicleRentDto>> GetVehicleRentsPaginated(int skip, int take)
    {
        return await _vehicleRentRepository.GetVehicleRentsPaginated(skip, take);
    }

    public int GetNumberOfRents()
    {
        return _vehicleRentRepository.GetNumberOfRents();
    }

    public async Task<int> GetNumberOfRentsByClientId(Guid clientId)
    {
        return await _vehicleRentRepository.GetNumberOfRentsByClientId(clientId);
    }

    public async Task<int> GetNumberOfRentsByOwner(string owner)
    {
        return await _vehicleRentRepository.GetNumberOfRentsByOwner(owner);
    }
}