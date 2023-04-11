using System.Linq.Expressions;
using mpp1.Model;

namespace mpp1.Repository.Interfaces;

public interface IVehicleRepository
{
    Task AddVehicle(Vehicle vehicle);
    Task<Vehicle> UpdateVehicle(Vehicle vehicle);
    Task RemoveVehicle(Guid id);
    Task<Vehicle> GetByVehicleIdWithAllData(Guid vehicleId);
    Task<IEnumerable<Vehicle>> GetAllVehicles();
    Task<IEnumerable<Vehicle>> GetAllVehiclesWithAllData();
    Task<Vehicle> GetVehicleById(Guid id);
    Task<IEnumerable<Vehicle>> GetVehiclesFiltered(Expression<Func<Vehicle, bool>> condition);
    Task<IEnumerable<Vehicle>> GetVehiclesPaginated(int skip, int take);
}