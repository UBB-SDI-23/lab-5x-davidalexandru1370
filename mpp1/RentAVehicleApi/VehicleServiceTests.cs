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
            
            [Fact]
            public async Task GetMostVehiclesWithMostIncidents_ShouldReturnAListWithVehiclesSortedByNumberOfIncidents()
            {
                //Arrange
                var expectedResult = new List<VehicleDTO>()
                {
                    new()
                    {
                        Brand = "BMW",
                        HorsePower = 190,
                        CarPlate = "SJ70RTM",
                        NumberOfSeats = 5,
                        EngineCapacity = 2500,
                        FabricationDate = new DateTime(2005,03,13),
                        NumberOfIncidents = 0
                    },
                    new()
                    {
                        Brand = "BMW",
                        HorsePower = 500,
                        CarPlate = "SJ70DAV",
                        NumberOfSeats = 5,
                        EngineCapacity = 3000,
                        FabricationDate = new DateTime(2018,03,12),
                        NumberOfIncidents = 1
                    },
                    new()
                    {
                        Brand = "OPEL",
                        HorsePower = 101,
                        CarPlate = "SJ31RIA",
                        NumberOfSeats = 5,
                        EngineCapacity = 1900,
                        FabricationDate = new DateTime(2003,03,13),
                        NumberOfIncidents = 3
                    },
                  
                }; 
                
               var vehicles = new List<Vehicle>
                {
                    new()
                    {
                        Id = Guid.Parse("54a76704-eeec-4f7b-f90f-08db233c133f"),
                        Brand = "BMW",
                        HorsePower = 500,
                        CarPlate = "SJ70DAV",
                        NumberOfSeats = 5,
                        EngineCapacity = 3000,
                        FabricationDate = new DateTime(2018,03,12),
                        Incidents = new List<Incident>()
                        {
                            new Incident
                            {
                                Id = Guid.Parse("7e11e514-3b86-4685-0e80-08db255a936c"),
                                VehicleId = Guid.Parse("54a76704-eeec-4f7b-f90f-08db233c133f"),
                                Location = "Zalau",
                                Description = "lovit de stalp",
                                Cost = 7000,
                                WhenHappend = new DateTime(2019,10,11),
                            }
                        }
                    },
                    new()
                    {
                        Id = Guid.Parse("0f7a7c5f-2134-42c5-b026-08db23d5f85d"),
                        Brand = "OPEL",
                        HorsePower = 101,
                        CarPlate = "SJ31RIA",
                        NumberOfSeats = 5,
                        EngineCapacity = 1900,
                        FabricationDate = new DateTime(2003,03,13),
                        Incidents = new List<Incident>()
                        {
                            new Incident
                            {
                                Id = Guid.Parse("7e11e514-3b86-4685-0e80-08db255a946c"),
                                VehicleId = Guid.Parse("0f7a7c5f-2134-42c5-b026-08db23d5f85d"),
                                Location = "Cehu Silvaniei",
                                Description = "gard",
                                Cost = 800,
                                WhenHappend = new DateTime(2019,10,11),
                            },
                            new Incident
                            {
                                Id = Guid.Parse("7e11e514-3b86-4685-0e80-08db255a956c"),
                                VehicleId = Guid.Parse("0f7a7c5f-2134-42c5-b026-08db23d5f85d"),
                                Location = "Cehu Silvaniei",
                                Description = "stalp",
                                Cost = 300,
                                WhenHappend = new DateTime(2019,12,31),
                            },
                            new Incident
                            {
                                Id = Guid.Parse("7e11e514-3b86-4685-0e80-08db255a966c"),
                                VehicleId = Guid.Parse("0f7a7c5f-2134-42c5-b026-08db23d5f85d"),
                                Location = "Cehu Silvaniei",
                                Description = "intrat in sant",
                                Cost = 1100,
                                WhenHappend = new DateTime(2021,11,20),
                            }
                        }
                    },
                    new()
                    {
                        Id = Guid.Parse("42893200-696c-4d68-38c1-08db29e7f7e3"),
                        Brand = "BMW",
                        HorsePower = 190,
                        CarPlate = "SJ70RTM",
                        NumberOfSeats = 5,
                        EngineCapacity = 2500,
                        FabricationDate = new DateTime(2005,03,13),
                    }
                };
                
                _vehicleRepositoryMock.Setup(v => v.GetAllVehiclesWithAllData())
                    .ReturnsAsync(vehicles);
                //Act
                var result = await _vehicleService.GetVehiclesOrderByNumberOfIncidents();
                //Assert
                Assert.Equal(3,result.Count());
                Assert.Equal(expectedResult[0],result.ToList()[0]);
                Assert.Equal(expectedResult[1],result.ToList()[1]);
                Assert.Equal(expectedResult[2],result.ToList()[2]);
            }
        }
}