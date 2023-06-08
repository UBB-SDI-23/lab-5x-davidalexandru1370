using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IVehicleService
{
    /// <summary>
    /// This method add a vehicle in the database
    /// </summary>
    /// <param name="vehicle">vehicle model</param>
    /// <returns></returns>
    public Task AddVehicle(Vehicle vehicle);

    /// <summary>
    /// This method get vehicle with all associated data
    /// </summary>
    /// <param name="vehicle">vehicle model</param>
    /// <returns>Found vehicle, else throw repository exception</returns>
    public Task DeleteVehicle(Vehicle vehicle);

    /// <summary>
    /// This method remove vehicle from database
    /// </summary>
    /// <param name="vehicle"></param>
    /// <returns></returns>
    public Task<VehicleDTO> UpdateVehicle(Vehicle vehicle);

    /// <summary>
    /// This method get all vehicles with associated data 
    /// </summary>
    /// <returns>A list with all vehicles and their associated data from database</returns>
    public Task<IEnumerable<Vehicle>> GetAllVehicles();

    /// <summary>
    /// This method get vehicle by id
    /// </summary>
    /// <param name="vehicleId">vehicle id guid</param>
    /// <returns>Found vehicle, else throw repository exception</returns>
    public Task<Vehicle> GetVehicleById(Guid vehicleId);

    /// <summary>
    /// This method get all vehicles with associated data 
    /// </summary>
    /// <returns>A list with all vehicles and their associated data from database</returns>
    public Task<IEnumerable<Vehicle>> GetAllVehiclesWithAllData();

    /// <summary>
    /// This method get vehicles with capacity greater than given capacity parameter
    /// </summary>
    /// <param name="capacity">integer greater than 0</param>
    /// <returns>List of vehicles with capacity greater than given parameter capacity</returns>
    public Task<IEnumerable<Vehicle>> GetVehiclesWithCapacityGreaterThan(int capacity);

    /// <summary>
    /// This method get all vehicles with associated data 
    /// </summary>
    /// <returns>A list with all vehicles and their associated data from database</returns>
    public Task<Vehicle> GetVehicleByIdWithAllData(Guid vehicleId);

    /// <summary>
    /// This method returns vehicles ordered by their number of incidents
    /// </summary>
    /// <returns>List of vehicles ordered by their number of incidents</returns>
    public Task<IEnumerable<VehicleDTO>> GetVehiclesOrderByNumberOfIncidents();

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
    /// <param name="carPlate">string representing vehicle car plate</param>
    /// <returns>A list with vehicles by carPlate</returns>
    public Task<IEnumerable<Vehicle>> GetVehiclesByCarPlate(string carPlate);

    /// <summary>
    /// This method get number of vehicles by owner
    /// </summary>
    /// <param name="owner">user owner name string</param>
    /// <returns>Integer representing number of vehicles owned by owner</returns>
    public Task<int> GetNumberOfVehiclesByOwner(string owner);
}