using System.Text;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;
using mpp1.Service.Interfaces;

namespace mpp1.Service;

public class VehicleService : IVehicleService
{
    private IVehicleRepository _vehicleRepository;
    public VehicleService(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }
    
    public async Task AddVehicle(Vehicle vehicle)
    {
        await _vehicleRepository.AddVehicle(vehicle);
    }
    
    public async Task DeleteVehicle(Guid id)
    {
        await _vehicleRepository.RemoveVehicle(id);
    }

    public async Task<Vehicle> UpdateVehicle(Vehicle vehicle)
    {
        return await _vehicleRepository.UpdateVehicle(vehicle);
    }

    public Task<IEnumerable<Vehicle>> GetAllVehicles()
    {
        return _vehicleRepository.GetAllVehicles();
    }

    public async Task<Vehicle> GetVehicleById(Guid vehicleId)
    {
        return await _vehicleRepository.GetVehicleById(vehicleId);
    }

    public Task<IEnumerable<Vehicle>> GetAllVehiclesWithAllData()
    {
        return _vehicleRepository.GetAllVehiclesWithAllData();
    }

    public Task<IEnumerable<Vehicle>> GetVehiclesWithCapacityGreaterThan(int capacity)
    {
        return _vehicleRepository.GetVehiclesFiltered(v => v.EngineCapacity > capacity);
    }

    public Task<Vehicle> GetVehicleByIdWithAllData(Guid vehicleId)
    {
        return _vehicleRepository.GetByVehicleIdWithAllData(vehicleId);
    }

    public async Task<IEnumerable<VehicleDTO>> GetVehiclesOrderByNumberOfIncidents()
    {
        var result = (await GetAllVehiclesWithAllData())
            .OrderBy(v => v.Incidents?.Count)
            .Select(v => new VehicleDTO
            {
                EngineCapacity = v.EngineCapacity,
                Brand = v.Brand,
                CarPlate = v.CarPlate,
                FabricationDate = v.FabricationDate,
                HorsePower = v.HorsePower,
                NumberOfSeats = v.NumberOfSeats,
                NumberOfIncidents = v.Incidents?.Count ?? 0
            });
        return result;
    }

    public async Task<IEnumerable<Vehicle>> GetVehiclesPaginated(int skip, int take)
    {
        return await _vehicleRepository.GetVehiclesPaginated(skip, take);
    }

    public Task<IEnumerable<Vehicle>> GetVehiclesByCarPlate(string carPlate)
    {
        string normalizedCarPlate = normalizeCarPlate(carPlate);
        return _vehicleRepository.GetVehiclesByCarPlate(normalizedCarPlate);
    }

    private string normalizeCarPlate(string carPlate)
    {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.Append(carPlate.ToUpper());
        return stringBuilder.ToString();
    }
}