namespace mpp1.Model.DTO;

public class VehicleRentDto
{
    public Guid Id { get; set; }
    public virtual Guid VehicleId { get; set; }
    public virtual Guid ClientId { get; set; }
    public virtual Vehicle Vehicle { get; set; }
    public virtual Client Client { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public int TotalCost { get; set; }
    public string? Comments { get; set; }
    public string OwnerName { get; set; }
    public int NumberOfTimesRented { get; set; }
}