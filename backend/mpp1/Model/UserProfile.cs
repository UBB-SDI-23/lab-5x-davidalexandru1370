using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using mpp1.Enums;

namespace mpp1.Model;

[Table("UserProfile")]
public class UserProfile
{
    [JsonIgnore] public User User { get; set; } = null!;
    [Key] [ForeignKey("User")] public Guid UserId { get; set; }
    [Required] public string Bio { get; set; } = null!;
    [Required] public string Location { get; set; } = null!;
    [Required] public DateOnly Birthday { get; set; }
    [Required] public GendersEnum Gender { get; set; }
    [Required] public MaritalStatusEnum MaritalStatus { get; set; }
    [Required] public RolesEnum Role { get; set; }
}