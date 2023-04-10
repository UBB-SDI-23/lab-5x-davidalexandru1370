using mpp1.Model;
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

    public async Task RemoveClient(Guid id)
    {
        await _clientRepository.RemoveClient(id);
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

    public async Task<IEnumerable<Client>> GetClientsPaginated(int skip, int take)
    {
        return await _clientRepository.GetClientsPaginated(skip, take);
    }
}