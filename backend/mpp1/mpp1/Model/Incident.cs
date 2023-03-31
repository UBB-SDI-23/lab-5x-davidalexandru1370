using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace mpp1.Model;

public class Incident
{
    [Key]
    public Guid Id { get; set; }
    [JsonIgnore]
    public virtual Vehicle? Vehicle { get; set; }
    public virtual Guid VehicleId { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
    [Range(0,Int32.MaxValue)]
    public int Cost { get; set; }
    public DateTime WhenHappend { get; set; }
}