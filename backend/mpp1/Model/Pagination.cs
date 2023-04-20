namespace mpp1.Model;

public class Pagination<TElem>
{
    public IEnumerable<TElem> Elements { get; set; } = null!;
    public bool HasPrevious { get; set; }
    public bool HasNext { get; set; }
}