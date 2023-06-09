using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mpp1.Model;

[Table("Messages")]
public class Message
{
    [Key]
    public Guid Id { get; set; }
    public string Username { get; set; } = null!;
    public string Text { get; set; } = null!;
}