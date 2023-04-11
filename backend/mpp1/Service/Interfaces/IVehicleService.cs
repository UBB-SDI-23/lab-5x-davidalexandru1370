using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IVehicleService
{
    Task AddVehicle(Vehicle vehicle);
    Task DeleteVehicle(Guid id);
    Task<Vehicle> UpdateVehicle(Vehicle vehicle);
    Task<IEnumerable<Vehicle>> GetAllVehicles();
    Task<Vehicle> GetVehicleById(Guid vehicleId);
    Task<IEnumerable<Vehicle>> GetAllVehiclesWithAllData();
    Task<IEnumerable<Vehicle>> GetVehiclesWithCapacityGreaterThan(int capacity);
    Task<Vehicle> GetVehicleByIdWithAllData(Guid vehicleId);
    Task<IEnumerable<VehicleDTO>> GetVehiclesOrderByNumberOfIncidents();
    Task<IEnumerable<Vehicle>> GetVehiclesPaginated(int skip, int take);
}
