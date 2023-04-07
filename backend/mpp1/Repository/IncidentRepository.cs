using Microsoft.EntityFrameworkCore;
using mpp1.DatabaseContext;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Repository.Interfaces;

namespace mpp1.Repository;

public class IncidentRepository : IIncidentsRepository
{
    private readonly RentACarDbContext _rentACarDbContext;

    public IncidentRepository(RentACarDbContext rentACarDbContext)
    {
        _rentACarDbContext = rentACarDbContext;
    }

    public async Task AddIncident(Incident incident)
    {
        if (incident is null)
        {
            throw new RepositoryException("Invalid incidnet");
        }

        _rentACarDbContext.Set<Incident>().Add(incident);

        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task RemoveIncident(Guid id)
    {
        var incident = await GetIncidentById(id);
        
        if (incident is null)
        {
            throw new RepositoryException($"Incident with Id={id} does not exists!");
        }

        _rentACarDbContext.Remove(incident);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task<Incident> UpdateIncident(Incident incident)
    {
        if (incident is null)
        {
            throw new RepositoryException("Invalid incident");
        }

        var foundIncident = await _rentACarDbContext.Incidents.FirstOrDefaultAsync(i => i.Id == incident.Id);

        if (foundIncident is null)
        {
            throw new RepositoryException($"Incident with Id={incident.Id} does not exists!");
        }
        
        _rentACarDbContext.Entry(foundIncident).CurrentValues.SetValues(incident);
        await _rentACarDbContext.SaveChangesAsync();

        return foundIncident;
    }

    public Task<IEnumerable<Incident>> GetAllIncidents()
    {
        var result = _rentACarDbContext.Set<Incident>().ToList() as IEnumerable<Incident>;
        return Task.FromResult(result);
    }

    public async Task<Incident> GetIncidentById(Guid id)
    {
        var result = await _rentACarDbContext.Incidents.FirstOrDefaultAsync(i => i.Id == id);
        if (result is null)
        {
            throw new RepositoryException($"Incident with Id={id} does not exists!");
        }

        return result;
    }

    public Task<IEnumerable<Incident>> GetIncidentsByVehicleId(Guid vehicleId)
    {
        var incidents = _rentACarDbContext.Incidents.Where(v => v.VehicleId == vehicleId) as IEnumerable<Incident>;
        return Task.FromResult(incidents);
    }
}