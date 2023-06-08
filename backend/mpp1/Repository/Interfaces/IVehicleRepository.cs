using System.Linq.Expressions;
using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Repository.Interfaces;

public interface IVehicleRepository
{
    /// <summary>
    /// This method add a vehicle in the database
    /// </summary>
    /// <param name="vehicle">vehicle model</param>
    /// <returns></returns>
    public Task AddVehicle(Vehicle vehicle);
    /// <summary>
    /// This method update vehicle in database
    /// </summary>
    /// <param name="vehicle">vehicle model</param>
    /// <returns>Return updated vehicle if updated successfully, else throw repository exception</returns>
    public Task<VehicleDTO> UpdateVehicle(Vehicle vehicle);
    /// <summary>
    /// This method remove vehicle from database
    /// </summary>
    /// <param name="vehicle"></param>
    /// <returns></returns>
    public Task RemoveVehicle(Vehicle vehicle);
    /// <summary>
    /// This method get vehicle with all associated data
    /// </summary>
    /// <param name="vehicleId">vehicle id guid</param>
    /// <returns>Found vehicle, else throw repository exception</returns>
    public Task<Vehicle> GetByVehicleIdWithAllData(Guid vehicleId);
    /// <summary>
    /// This method returns a list with all vehicles in database
    /// </summary>
    /// <returns>A list with all vehicles from database</returns>
    public Task<IEnumerable<Vehicle>> GetAllVehicles();
    /// <summary>
    /// This method get all vehicles with associated data 
    /// </summary>
    /// <returns>A list with all vehicles and their associated data from database</returns>
    public Task<IEnumerable<Vehicle>> GetAllVehiclesWithAllData();
    /// <summary>
    /// This method get vehicle by id
    /// </summary>
    /// <param name="id">vehicle id guid</param>
    /// <returns>Found vehicle, else throw repository exception</returns>
    public Task<Vehicle> GetVehicleById(Guid id);
    /// <summary>
    /// This method filter all vehicles with given condition
    /// </summary>
    /// <param name="condition">a lambda function taking a vehicle and returning a bool</param>
    /// <returns>A list with all vehicles for each condition evaluates to true</returns>
    public Task<IEnumerable<Vehicle>> GetVehiclesFiltered(Expression<Func<Vehicle, bool>> condition);
    /// <summary>
    /// This method get vehicles paginated
    /// </summary>
    /// <param name="skip">number of items to skip</param>
    /// <param name="take">number of items to take</param>
    /// <returns></returns>
    public Task<Pagination<VehicleDTO>> GetVehiclesPaginated(int skip, int take);
    /// <summary>
    /// This method get vehicles by car plate
    /// </summary>
    /// <param name="carPlate">string repsenting vehicle car plate</param>
    /// <returns>A list with vehicles by carplate</returns>
    public Task<IEnumerable<Vehicle>> GetVehiclesByCarPlate(string carPlate);
    /// <summary>
    /// This method get number of vehicles by owner
    /// </summary>
    /// <param name="owner">user owner name string</param>
    /// <returns>Integer representing number of vehicles owned by owner</returns>
    public Task<int> GetNumberOfVehiclesByOwner(string owner);
}