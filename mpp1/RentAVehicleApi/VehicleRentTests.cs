using Moq;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;
using mpp1.Service;

namespace RentAVehicleApi;

public class VehicleRentTests
{
    private readonly VehicleRentService _vehicleRentService;
    private readonly ClientService _clientService;
    private readonly Mock<IVehicleRentRepository> _vehicleRentRepositoryMock = new();
    private readonly Mock<IClientRepository> _clientRepositoryMock = new();
    
    public VehicleRentTests()
    {
        _clientService = new ClientService(_clientRepositoryMock.Object);
        _vehicleRentService = new VehicleRentService(_vehicleRentRepositoryMock.Object, _clientService);
    }
    
    [Fact]
    public async Task TestGetMostActiveClients_ShouldReturnAListWithMostActiveClientsSortedDescending()
    {
        //Arrange
        var clients = new List<Client>()
        {
            new Client()
            {
                Id = Guid.Parse("54a76704-eeec-4f7b-f90f-08db233c133f"),
                CardNumber = "1234-5678-9123-4567",
                Nationality = "Romanian",
                CNP = "5020320691005",
                Name = "David",
                Birthday = new DateOnly(2002,06,20)
            },
            new Client()
            {
                Id = Guid.Parse("54a76704-eeec-5f8b-f90f-08db233c133f"),
                CardNumber = "1234-5678-9123-4568",
                Nationality = "Romanian",
                CNP = "5020320691003",
                Name = "Andrei",
                Birthday = new DateOnly(2002,08,14)
            },

        };

        var rents = new List<VehicleRent>()
        {
            new VehicleRent()
            {
                Id = Guid.Parse("54a76704-eeec-5f8b-f90f-08db666c133f"),
                VehicleId = Guid.Parse("0f7a7c5f-2134-42c5-b026-08db23d5f85d"),
                ClientId = Guid.Parse("54a76704-eeec-4f7b-f90f-08db233c133f"),
                Comments = "",
                TotalCost = 400,
                StartDate = new DateTime(2021, 10, 20),
                EndDate = new DateTime(2021, 10, 25)

            },
            new VehicleRent()
            {
                Id = Guid.Parse("55a76704-eeec-5f8b-f90f-08db666c133f"),
                VehicleId = Guid.Parse("0f7a7c5f-2134-42c5-b026-08db23d5f85d"),
                ClientId = Guid.Parse("54a76704-eeec-4f7b-f90f-08db233c133f"),
                Comments = "",
                TotalCost = 600,
                StartDate = new DateTime(2021, 11, 20),
                EndDate = new DateTime(2021, 11, 25)
            },
            new VehicleRent()
            {
                Id = Guid.Parse("56a76704-eeec-5f8b-f90f-08db666c133f"),
                VehicleId = Guid.Parse("0f7a7c5f-2134-42c5-b026-08db23d5f85d"),
                ClientId = Guid.Parse("54a76704-eeec-4f7b-f90f-08db233c133f"),
                Comments = "",
                TotalCost = 600,
                StartDate = new DateTime(2021, 12, 20),
                EndDate = new DateTime(2021, 12, 25)
            },
            new VehicleRent()
            {
                Id = Guid.Parse("57a76704-eeec-5f8b-f90f-08db666c133f"),
                VehicleId = Guid.Parse("42893200-696c-4d68-38c1-08db29e7f7e3"),
                ClientId = Guid.Parse("54a76704-eeec-5f8b-f90f-08db233c133f"),
                Comments = "",
                TotalCost = 600,
                StartDate = new DateTime(2021, 12, 20),
                EndDate = new DateTime(2021, 12, 25)
            },
        };

        var expectedResult = new List<ClientDTO>
        {
            new ClientDTO()
            {
                CardNumber = "1234-5678-9123-4567",
                Nationality = "Romanian",
                CNP = "5020320691005",
                Name = "David",
                Birthday = new DateOnly(2002, 06, 20),
                NumberOfRents = 3
            },
            new ClientDTO()
            {
                CardNumber = "1234-5678-9123-4568",
                Nationality = "Romanian",
                CNP = "5020320691003",
                Name = "Andrei",
                Birthday = new DateOnly(2002, 08, 14),
                NumberOfRents = 1
            },

        };

        _clientRepositoryMock.Setup(x => x.GetAllClients()).ReturnsAsync(clients);
        _vehicleRentRepositoryMock.Setup(x => x.GetAllRents()).ReturnsAsync(rents);

        //Act
        var actualResult =  await _vehicleRentService.GetMostActiveClients();
        //Assert
        Assert.Equal(actualResult.ToList()[0],expectedResult[0]);
        Assert.Equal(actualResult.ToList()[1],expectedResult[1]);
        Assert.Equal(actualResult.Count(),expectedResult.Count());
    }

}