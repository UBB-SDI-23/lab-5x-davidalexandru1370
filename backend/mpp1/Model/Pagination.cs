namespace mpp1.Model;

public class Pagination<TElem>
{
    public IEnumerable<TElem> Elements { get; set; } = null!;
    public int TotalNumberOfElements { get; set; }
}