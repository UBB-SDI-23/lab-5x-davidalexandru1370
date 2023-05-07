using mpp1.Enums;

namespace mpp1.Model;

public class Owner
{
    public string Username { get; set; } = null!;
    public Guid UserId { get; set; }
    public RolesEnum Role { get; set; }
}