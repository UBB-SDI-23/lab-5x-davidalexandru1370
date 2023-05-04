using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Repository.Interfaces;
using mpp1.Service.Interfaces;
using mpp1.Validators;

namespace mpp1.Service;

public class IncidentService : IIncidentService
{
    private IVehicleService _vehicleService;
    private IIncidentsRepository _incidentsRepository;

    public IncidentService(IIncidentsRepository incidentsRepository, IVehicleService vehicleService)
    {
        _incidentsRepository = incidentsRepository;
        _vehicleService = vehicleService;
    }

    public async Task AddIncident(Incident incident)
    {
        IncidentValidator.ValidateIncident(incident, await _vehicleService.GetVehicleById(incident.VehicleId));
        await _incidentsRepository.AddIncident(incident);
    }

    public async Task RemoveIncident(Guid id)
    {
        await _incidentsRepository.RemoveIncident(id);
    }

    public Task<IEnumerable<Incident>> GetAllIncidents()
    {
        return _incidentsRepository.GetAllIncidents();
    }

    public async Task<Incident> UpdateIncident(Incident incident)
    {
        return await _incidentsRepository.UpdateIncident(incident);
    }

    public async Task<Incident> GetIncidentById(Guid id)
    {
        return await _incidentsRepository.GetIncidentById(id);
    }

    public Task<IEnumerable<Incident>> GetIncidentsByVehicleId(Guid vehicleId)
    {
        return _incidentsRepository.GetIncidentsByVehicleId(vehicleId);
    }

    public async Task ChangeIncidentsIdToAnotherVehicleId(Guid vehicleId, IEnumerable<Guid> incidentIds)
    {
        try
        {
            foreach (var incidentId in incidentIds)
            {
                var incident = await _incidentsRepository.GetIncidentById(incidentId);
                incident.VehicleId = vehicleId;
                await UpdateIncident(incident);
            }
        }
        catch (Exception e)
        {
            throw new RentACarException(e.Message);
        }
    }

    public async Task<int> GetNumberOfIncidentsByOwner(string owner)
    {
        return await _incidentsRepository.GetIncidentsCountOfUser(owner);
    }
}