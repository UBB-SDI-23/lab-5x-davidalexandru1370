namespace mpp1.Model.DTO;

public class VehicleDTO
{
    public string Brand { get; set; }
    public int HorsePower { get; set; }
    public string CarPlate { get; set; }
    public int NumberOfSeats { get; set; }
    public int EngineCapacity { get; set; }
    public DateTime FabricationDate { get; set; }
    public int NumberOfIncidents { get; set; }

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