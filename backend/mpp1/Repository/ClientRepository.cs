using Microsoft.EntityFrameworkCore;
using mpp1.DatabaseContext;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;

namespace mpp1.Repository;

public class ClientRepository : IClientRepository
{
    private readonly RentACarDbContext _rentACarDbContext;

    public ClientRepository(RentACarDbContext rentACarDbContext)
    {
        _rentACarDbContext = rentACarDbContext;
    }

    public async Task AddClient(Client client)
    {
        if (client is null)
        {
            throw new RepositoryException("Invalid client");
        }

        _rentACarDbContext.Set<Client>().Add(client);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task RemoveClient(Guid id)
    {
        var client = await GetClientById(id);

        if (client is null)
        {
            throw new RepositoryException($"Client with Id={id} does not exists!");
        }

        _rentACarDbContext.Remove(client);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task<Client> UpdateClient(Client client)
    {
        if (client is null)
        {
            throw new RepositoryException("Invalid client");
        }

        var foundClient = await _rentACarDbContext.Clients.FirstOrDefaultAsync(c => c.Id == client.Id);

        if (foundClient is null)
        {
            throw new RepositoryException($"Client with Id={client.Id} does not exists");
        }

        _rentACarDbContext.Entry(foundClient).CurrentValues.SetValues(client);
        await _rentACarDbContext.SaveChangesAsync();
        return client;
    }

    public Task<IEnumerable<Client>> GetAllClients()
    {
        var result = _rentACarDbContext.Set<Client>().ToList() as IEnumerable<Client>;
        return Task.FromResult(result);
    }

    public async Task<Client> GetClientById(Guid id)
    {
        var result = await _rentACarDbContext.Clients.FirstOrDefaultAsync(c => c.Id == id);
        if (result is null)
        {
            throw new RepositoryException($"Client with Id={id} does not exists!");
        }

        return result;
    }

    public async Task<Pagination<ClientDTO>> GetClientsPaginated(int skip, int take)
    {
        Pagination<ClientDTO> clientsPaginated = new();

        var result =
            (await _rentACarDbContext.Clients.Skip(skip).Take(take).Include(c => c.User).ToListAsync() as
                IEnumerable<Client>).Select(c => new ClientDTO()
            {
                Id = c.Id,
                Name = c.Name,
                Birthday = c.Birthday,
                Nationality = c.Nationality,
                Ownername = c.User!.Name,
                CardNumber = c.CardNumber,
                CNP = c.CNP
            });

        clientsPaginated.Elements = result;

        int numberOfClients = GetNumberOfClients();
        clientsPaginated.TotalNumberOfElements = numberOfClients;

        return clientsPaginated;
    }

    public int GetNumberOfClients()
    {
        return _rentACarDbContext.Set<Client>().Count();
    }

    public Task<IEnumerable<Client>> GetClientsByName(string name)
    {
        if (name is null)
        {
            throw new RepositoryException("Invalid name");
        }

        const int maximumClients = 15;

        var foundClients = _rentACarDbContext
                .Set<Client>()
                .Where(c => c.Name.Contains(name))
                .Take(maximumClients)
            as IEnumerable<Client>;

        return Task.FromResult(foundClients);
    }
}