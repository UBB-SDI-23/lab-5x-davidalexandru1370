using mpp1.Model;

namespace mpp1.Repository.Interfaces;

public interface IIncidentsRepository
{
    public Task AddIncident(Incident incident);

    public Task RemoveIncident(Guid id);
    Task<Incident> UpdateIncident(Incident incident);

    public Task<IEnumerable<Incident>> GetAllIncidents();

    public Task<Incident> GetIncidentById(Guid id);

    public Task<IEnumerable<Incident>> GetIncidentsByVehicleId(Guid vehicleId);
}