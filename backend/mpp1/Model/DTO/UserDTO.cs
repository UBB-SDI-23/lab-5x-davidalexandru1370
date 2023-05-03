using System.ComponentModel.DataAnnotations;
using mpp1.Enums;
using mpp1.Validators.ClientValidators;

namespace mpp1.Model.DTO;

public class UserDto
{
    
    public string Username { get; set; } = null!;
    [MinLength(5, ErrorMessage = "Password must be at least 5 characters long!")]
    public string Password { get; set; } = null!;
    [MinLength(5, ErrorMessage = "Bio must be at least 5 characters long!")]
    public string Bio { get; set; } = null!;
    [MinLength(4, ErrorMessage = "Location must be at least 4 characters long!")]
    public string Location { get; set; } = null!;
    [MinimumAge(14,ErrorMessage = "You must be at least 14 years old to create an account!")]
    public DateOnly Birthday { get; set; }
    public GendersEnum Gender { get; set; }
    public MaritalStatusEnum MaritalStatus { get; set; }
}