using mpp1.Enums;

namespace mpp1.Model.DTO;

public class UserDto
{
    public string Name { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Bio { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateOnly Birthday { get; set; }
    public GendersEnum Gender { get; set; }
    public MaritalStatusEnum MaritalStatus { get; set; }
}