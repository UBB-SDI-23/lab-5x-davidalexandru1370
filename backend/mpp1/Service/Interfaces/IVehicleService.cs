using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IVehicleService
{
    public Task AddVehicle(Vehicle vehicle);
    public Task DeleteVehicle(Guid id);
    public Task<Vehicle> UpdateVehicle(Vehicle vehicle);
    public Task<IEnumerable<Vehicle>> GetAllVehicles();
    public Task<Vehicle> GetVehicleById(Guid vehicleId);
    public Task<IEnumerable<Vehicle>> GetAllVehiclesWithAllData();
    public Task<IEnumerable<Vehicle>> GetVehiclesWithCapacityGreaterThan(int capacity);
    public Task<Vehicle> GetVehicleByIdWithAllData(Guid vehicleId);
    public Task<IEnumerable<VehicleDTO>> GetVehiclesOrderByNumberOfIncidents();
    public Task<Pagination<Vehicle>> GetVehiclesPaginated(int skip, int take);
    public Task<IEnumerable<Vehicle>> GetVehiclesByCarPlate(string carPlate);

}
