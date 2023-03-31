using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IVehicleRentService
{
    public Task AddVehicleRent(VehicleRent vehicleRent);
    public Task DeleteVehicleRent(Guid vehicleRentId);
    public Task<VehicleRent> UpdateVehicleRent(VehicleRent vehicleRent);
    public Task<IEnumerable<Vehicle>> GetVehiclesByClientId(Guid clientId);
    public Task<IEnumerable<Client>> GetClientsByVehicleId(Guid vehicleId);
    public Task<IEnumerable<VehicleRent>> GetAllRents();
    public Task<VehicleRent> GetVehicleRentById(Guid vehicleRentId);
    public Task<IEnumerable<ClientDTO>> GetMostActiveClients();
}