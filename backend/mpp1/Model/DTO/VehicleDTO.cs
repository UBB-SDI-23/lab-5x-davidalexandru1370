namespace mpp1.Model.DTO;

public class VehicleDTO
{
    public Guid Id { get; set; }
    public string Brand { get; set; } = null!;
    public int HorsePower { get; set; }
    public string CarPlate { get; set; } = null!;
    public int NumberOfSeats { get; set; }
    public int EngineCapacity { get; set; }
    public DateOnly FabricationDate { get; set; }
    public int NumberOfIncidents { get; set; }
    public string OwnerName { get; set; } = null!;

    public override bool Equals(object? obj)
    {
        if (obj is null)
        {
            return false;
        }

        VehicleDTO vehicleDto = obj as VehicleDTO;
        if (!vehicleDto.Brand.Equals(Brand) ||
            vehicleDto.HorsePower != HorsePower ||
            !vehicleDto.CarPlate.Equals(CarPlate) ||
            vehicleDto.NumberOfSeats != NumberOfSeats ||
            vehicleDto.EngineCapacity != EngineCapacity ||
            !vehicleDto.FabricationDate.Equals(FabricationDate) ||
            vehicleDto.NumberOfIncidents != NumberOfIncidents)
        {
            return false;
        }

        return true;
    }
}