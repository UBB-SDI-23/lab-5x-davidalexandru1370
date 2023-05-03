using System.ComponentModel.DataAnnotations;
using mpp1.Enums;
using mpp1.Validators.ClientValidators;

namespace mpp1.Model.DTO;

public class UserDto
{
    public string Username { get; set; } = null!;
    public string Bio { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateOnly Birthday { get; set; }
    public GendersEnum Gender { get; set; }
    public MaritalStatusEnum MaritalStatus { get; set; }
}