using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using mpp1.Validators.ClientValidators;

namespace mpp1.Model;

[Table("Client")]
public class Client
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    [RegularExpression(@"[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}")]
    public string CardNumber { get; set; }
    public string CNP { get; set; }
    [MinimumAge(18)]
    public DateOnly Birthday { get; set; }
    public string Nationality { get; set; }

}