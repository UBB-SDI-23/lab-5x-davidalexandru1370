using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Repository.Interfaces;

public interface IVehicleRentRepository
{
    /// <summary>
    /// This method a vehicle rent in database
    /// </summary>
    /// <param name="vehicleRent">vehicle rent model</param>
    /// <returns></returns>
    public Task AddVehicleRent(VehicleRent vehicleRent);

    /// <summary>
    /// This method delete vehicle rent from database
    /// </summary>
    /// <param name="vehicleRent">vehicle rent model</param>
    /// <returns></returns>
    public Task DeleteVehicleRent(VehicleRent vehicleRent);

    /// <summary>
    /// This method update vehicle rent from database
    /// </summary>
    /// <param name="vehicleRent">vehicle rent with updated fields</param>
    /// <returns>Updated vehicle rent if updated successfully, otherwise throw repository exception</returns>
    public Task<VehicleRent> UpdateVehicleRent(VehicleRent vehicleRent);
    
    /// <summary>
    /// This method get all rents from database
    /// </summary>
    /// <returns>A list with all vehicle rents from database</returns>
    public Task<IEnumerable<VehicleRent>> GetAllRents();

    /// <summary>
    /// This method get vehicles by client id
    /// </summary>
    /// <param name="clientId">client id</param>
    /// <returns>A list of vehicles by client id</returns>
    public Task<IEnumerable<Vehicle>> GetVehiclesByClientId(Guid clientId);

    /// <summary>
    /// This method get clients by vehicle id
    /// </summary>
    /// <param name="vehicleId">vehicle id guid</param>
    /// <returns>A list of clients by vehicle id</returns>
    public Task<IEnumerable<Client>> GetClientsByVehicleId(Guid vehicleId);

    /// <summary>
    /// This method get vehicle rent by its associated id
    /// </summary>
    /// <param name="vehicleRentId">vehicle rent id</param>
    /// <returns>Found vehicle rent by its id, else throw repository exception</returns>
    public Task<VehicleRent> GetVehicleRentById(Guid vehicleRentId);

    /// <summary>
    /// This method get vehicles rents paginated
    /// </summary>
    /// <param name="skip">number representing skip items</param>
    /// <param name="take">number representing take items</param>
    /// <returns></returns>
    public Task<Pagination<VehicleRentDto>> GetVehicleRentsPaginated(int skip, int take);

    /// <summary>
    /// This method get number of rents 
    /// </summary>
    /// <returns>Integer representing number of rents</returns>
    public int GetNumberOfRents();

    /// <summary>
    /// This method get number of rents by client id
    /// </summary>
    /// <param name="clientId"></param>
    /// <returns>Integer representing number of rents by client</returns>
    public Task<int> GetNumberOfRentsByClientId(Guid clientId);

    /// <summary>
    /// This method represents number of rents by owner name
    /// </summary>
    /// <param name="owner"></param>
    /// <returns>Integer representing number of rents by owner name</returns>
    public Task<int> GetNumberOfRentsByOwner(string owner);
}