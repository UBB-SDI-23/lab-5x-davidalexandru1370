using mpp1.Model;

namespace mpp1.Repository.Interfaces;

public interface IVehicleRentRepository
{
    public Task AddVehicleRent(VehicleRent vehicleRent);

    public Task DeleteVehicleRent(Guid vehicleRentId);

    public Task<VehicleRent> UpdateVehicleRent(VehicleRent vehicleRent);
    public Task<IEnumerable<VehicleRent>> GetAllRents();

    public Task<IEnumerable<Vehicle>> GetVehiclesByClientId(Guid clientId);

    public Task<IEnumerable<Client>> GetClientsByVehicleId(Guid vehicleId);

    public Task<VehicleRent> GetVehicleRentById(Guid vehicleRentId);
}