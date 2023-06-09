using System.Text;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;
using mpp1.Service.Interfaces;

namespace mpp1.Service;

public class ClientService : IClientService
{
    private IClientRepository _clientRepository;

    public ClientService(IClientRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    public async Task AddClient(Client client)
    {
        await _clientRepository.AddClient(client);
    }

    public async Task RemoveClient(Client client)
    {
        await _clientRepository.RemoveClient(client);
    }

    public async Task<Client> UpdateClient(Client client)
    {
        return await _clientRepository.UpdateClient(client);
    }

    public Task<IEnumerable<Client>> GetAllClients()
    {
        return _clientRepository.GetAllClients();
    }

    public async Task<Client> GetClientById(Guid id)
    {
        return await _clientRepository.GetClientById(id);
    }

    public async Task<Pagination<ClientDTO>> GetClientsPaginated(int skip, int take)
    {
        return await _clientRepository.GetClientsPaginated(skip, take);
    }

    public Task<IEnumerable<Client>> GetClientsByName(string name)
    {
        string normalizedName = normalizeNameString(name);
        return _clientRepository.GetClientsByName(normalizedName);
    }

    public async Task<int> GetClientsCountOfUser(string owner)
    {
        return await _clientRepository.GetClientsCountOfUser(owner);
    }

    private string normalizeNameString(string name)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append(name[0].ToString().ToUpper() + name.Substring(1));
        return sb.ToString();
    }
}