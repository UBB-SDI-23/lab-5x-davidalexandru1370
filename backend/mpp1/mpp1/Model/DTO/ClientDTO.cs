namespace mpp1.Model.DTO;

public class ClientDTO
{
    public string Name { get; set; }
    public string CardNumber { get; set; }
    public string CNP { get; set; }
    public DateOnly Birthday { get; set; }
    public string Nationality { get; set; }
    public int NumberOfRents { get; set; }

    public override bool Equals(object? obj)
    {
        if (obj is null)
        {
            return false;
        }

        var clientDto = obj as ClientDTO;

        if (clientDto.Name != Name ||
            clientDto.Birthday != Birthday ||
            clientDto.CardNumber != CardNumber ||
            clientDto.CNP != CNP ||
            clientDto.Nationality != Nationality ||
            clientDto.NumberOfRents != NumberOfRents)
        {
            return false;
        }
        
        return true;
    }
}