using mpp1.Model;

namespace mpp1.Service;

public interface IIncidentService
{
    public Task AddIncident(Incident incident);

    public Task RemoveIncident(Guid id);

    public Task<IEnumerable<Incident>> GetAllIncidents();

    public Task<Incident> UpdateIncident(Incident incident);

    public Task<Incident> GetIncidentById(Guid id);

    public Task<IEnumerable<Incident>> GetIncidentsByVehicleId(Guid vehicleId);

    public Task ChangeIncidentsIdToAnotherVehicleId(Guid vehicleId, IEnumerable<Guid> incidentIds);

    public Task<int> GetNumberOfIncidentsByOwner(string owner);
}