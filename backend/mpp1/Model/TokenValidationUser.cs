using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace mpp1.Model;

[Table("TokenValidationUser")]
public class TokenValidationUser
{
    [JsonIgnore] public User User { get; set; } = null!;
    [Key] public Guid Id { get; set; }
    [Required] [ForeignKey("User")] public Guid UserId { get; set; }
    [Required] public DateTime IssuedAt { get; set; }

    [NotMapped] [JsonIgnore] private readonly int _expireTimeInMinutes = 10;
    [NotMapped] [JsonIgnore] public bool HasExpired => (DateTime.Now - IssuedAt).Minutes >= _expireTimeInMinutes;
}