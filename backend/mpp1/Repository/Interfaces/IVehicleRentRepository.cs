using mpp1.Model;
using mpp1.Model.DTO;

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

    public Task<Pagination<VehicleRentDto>> GetVehicleRentsPaginated(int skip, int take);

    public int GetNumberOfRents();

    public Task<int> GetNumberOfRentsByClientId(Guid clientId);

    public Task<int> GetNumberOfRentsByOwner(string owner);
}