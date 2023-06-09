using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace mpp1.Model;

[Table("VehicleRent")]
public class VehicleRent : IValidatableObject
{
    [Key] public Guid Id { get; set; }
    public virtual Vehicle? Vehicle { get; set; }
    public virtual Client? Client { get; set; }
    public virtual Guid VehicleId { get; set; }
    public virtual Guid ClientId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    [JsonIgnore]
    [InverseProperty("VehicleRents")]
    public virtual User? User { get; set; } = null!;

    [ForeignKey("User")] public Guid UserId { get; set; }

    public int TotalCost { get; set; }
    public string? Comments { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (StartDate > EndDate)
        {
            yield return new ValidationResult("Start date can not be later then end date!", new[] { "errors   " });
        }

        if (TotalCost < 0)
        {
            yield return new ValidationResult("Total cost can not be lower than 0!", new[] { "errors" });
        }
    }
}