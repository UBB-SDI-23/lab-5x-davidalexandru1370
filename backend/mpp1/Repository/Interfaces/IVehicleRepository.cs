using System.Linq.Expressions;
using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Repository.Interfaces;

public interface IVehicleRepository
{
    public Task AddVehicle(Vehicle vehicle);
    public Task<VehicleDTO> UpdateVehicle(Vehicle vehicle);
    public Task RemoveVehicle(Guid id);
    public Task<Vehicle> GetByVehicleIdWithAllData(Guid vehicleId);
    public Task<IEnumerable<Vehicle>> GetAllVehicles();
    public Task<IEnumerable<Vehicle>> GetAllVehiclesWithAllData();
    public Task<Vehicle> GetVehicleById(Guid id);
    public Task<IEnumerable<Vehicle>> GetVehiclesFiltered(Expression<Func<Vehicle, bool>> condition);
    public Task<Pagination<VehicleDTO>> GetVehiclesPaginated(int skip, int take);
    public Task<IEnumerable<Vehicle>> GetVehiclesByCarPlate(string carPlate);
    public Task<int> GetNumberOfVehiclesByOwner(string owner);
}