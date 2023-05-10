using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Repository.Interfaces;

public interface IClientRepository
{
    public Task AddClient(Client client);

    public Task RemoveClient(Client client);

    public Task<Client> UpdateClient(Client client);

    public Task<IEnumerable<Client>> GetAllClients();

    public Task<Client> GetClientById(Guid id);

    public Task<Pagination<ClientDTO>> GetClientsPaginated(int skip, int take);

    public int GetNumberOfClients();
    
    public Task<IEnumerable<Client>> GetClientsByName(string name);

    public Task<int> GetClientsCountOfUser(string owner);
}