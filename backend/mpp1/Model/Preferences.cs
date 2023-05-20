using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mpp1.Model;

[Table(("Preferences"))]
public class Preferences
{
    [Key] public Guid Id { get; set; }
    public int NumberOfItemsPerPage { get; set; }
}