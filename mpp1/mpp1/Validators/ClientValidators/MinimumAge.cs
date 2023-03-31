using System.ComponentModel.DataAnnotations;

namespace mpp1.Validators.ClientValidators;

public class MinimumAge : ValidationAttribute
{
    private int _minimumAge;

    public MinimumAge(int minimumAge)
    {
        _minimumAge = minimumAge;
    }

    public MinimumAge(string errorMessage, int minimumAge) : base(errorMessage)
    {
        _minimumAge = minimumAge;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        DateTime today = DateTime.Now;
        DateTime birthday = DateTime.Parse(value.ToString());
        if (birthday.AddYears(_minimumAge) > today)
        {
            var result = new ValidationResult("You are not at least 18 years old!");
            return result;
        }
        
        return null;
    }
}