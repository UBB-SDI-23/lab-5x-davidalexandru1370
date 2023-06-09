using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IClientService
{
    /// <summary>
    /// This method add a client int database
    /// </summary>
    /// <param name="client">client model</param>
    /// <returns>The added client</returns>
    public Task AddClient(Client client);

    /// <summary>
    /// This method Remove a client from database
    /// </summary>
    /// <param name="client">client model</param>
    /// <returns></returns>
    public Task RemoveClient(Client client);

    /// <summary>
    /// This method update client in database
    /// </summary>
    /// <param name="client">new client with updated fields</param>
    /// <returns></returns>
    public Task<Client> UpdateClient(Client client);

    /// <summary>
    /// This method get all clients from database
    /// </summary>
    /// <returns>A list with all clients from database</returns>
    public Task<IEnumerable<Client>> GetAllClients();

    /// <summary>
    /// This method get client by its associated id
    /// </summary>
    /// <param name="id">client id guid</param>
    /// <returns>Client found by id, otherwise throws RepositoryException</returns>
    public Task<Client> GetClientById(Guid id);

    /// <summary>
    /// Get clients paginated
    /// </summary>
    /// <param name="skip">number of items to skip</param>
    /// <param name="take">number of items to take</param>
    /// <returns>A list with items paginated</returns>
    public Task<Pagination<ClientDTO>> GetClientsPaginated(int skip, int take);

    /// <summary>
    /// Get clients by name
    /// </summary>
    /// <param name="name">client name - string</param  >
    /// <returns>A list with clients by name</returns>
    public Task<IEnumerable<Client>> GetClientsByName(string name);

    /// <summary>
    /// Get number of items a user owns
    /// </summary>
    /// <param name="owner">owner user name - string</param>
    /// <returns>Integer representing number of items having given owner</returns>
    public Task<int> GetClientsCountOfUser(string owner);
}