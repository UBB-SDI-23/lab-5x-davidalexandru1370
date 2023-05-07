using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mpp1.Model;

[Table("User")]
public class User
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Password { get; set; }
    
    [InverseProperty(nameof(VehicleRent.User))]
    public ICollection<VehicleRent> VehicleRents { get; set; }
}