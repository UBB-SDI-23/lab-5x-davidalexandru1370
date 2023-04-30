using mpp1.Enums;

namespace mpp1.Model.DTO;

public class UserDTO
{
    public string Name { get; set; }
    public string Password { get; set; }
    public string Bio { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateOnly Birthday { get; set; }
    public GendersEnum Gender { get; set; }
    public MaritalStatusEnum MaritalStatus { get; set; }
}