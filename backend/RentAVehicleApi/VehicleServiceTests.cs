using Moq;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;
using mpp1.Service;

namespace RentAVehicleApi
{
    public class VehicleServiceTests
    {
        private readonly VehicleService _vehicleService;
        private readonly Mock<IVehicleRepository> _vehicleRepositoryMock = new();

        public VehicleServiceTests()
        {
            _vehicleService = new VehicleService(_vehicleRepositoryMock.Object);
        }

    }
}