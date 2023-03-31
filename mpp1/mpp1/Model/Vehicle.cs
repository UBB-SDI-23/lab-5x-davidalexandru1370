using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mpp1.Model;

[Table("Vehicle")]
public class Vehicle
{
    [Key]
    public Guid Id { get; set; }
    public string Brand { get; set; }
    [Range(1,1000)]
    public int HorsePower { get; set; }
    [RegularExpression(@"[A-Z]{2}[0-9][0-9][A-Z]{3}")]
    public string CarPlate { get; set; }
    [Range(0,10)]
    public int NumberOfSeats { get; set; }
    [Range(0,Int32.MaxValue)]
    public int EngineCapacity { get; set; }
    public DateTime FabricationDate { get; set; }
    public virtual ICollection<Incident>? Incidents { get; set; } = null!;
}