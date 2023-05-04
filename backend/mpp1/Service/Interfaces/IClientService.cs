using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IClientService
{
    public Task AddClient(Client client);

    public Task RemoveClient(Guid id);

    public Task<Client> UpdateClient(Client client);

    public Task<IEnumerable<Client>> GetAllClients();

    public Task<Client> GetClientById(Guid id);

    public Task<Pagination<ClientDTO>> GetClientsPaginated(int skip, int take);

    public Task<IEnumerable<Client>> GetClientsByName(string name);

    public Task<int> GetClientsCountOfUser(string owner);

}