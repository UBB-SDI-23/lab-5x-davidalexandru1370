using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using mpp1.Enums;

namespace mpp1.Model;

public class UserProfile
{
    [JsonIgnore]
    public User User { get; set; }
    [Key]
    public User UserId { get; set; }
    [Required]
    public string Bio { get; set; } = null!;
    [Required]
    public string Location { get; set; } = null!;
    [Required]
    public DateOnly Birthday { get; set; }
    [Required]
    public GendersEnum Gender { get; set; }
    [Required]
    public MaritalStatusEnum MaritalStatus { get; set; }
}