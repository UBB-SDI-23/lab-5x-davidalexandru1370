using mpp1.Model;

namespace mpp1.Repository.Interfaces;

public interface IClientRepository
{
    public Task AddClient(Client client);

    public Task RemoveClient(Guid id);

    public Task<Client> UpdateClient(Client client);

    public Task<IEnumerable<Client>> GetAllClients();

    public Task<Client> GetClientById(Guid id);

    public Task<IEnumerable<Client>> GetClientsPaginated(int skip, int take);
}