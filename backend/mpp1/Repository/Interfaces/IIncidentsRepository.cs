using mpp1.Model;

namespace mpp1.Repository.Interfaces;

public interface IIncidentsRepository
{
    /// <summary>
    /// This method add incident into database
    /// </summary>
    /// <param name="incident">incident model</param>
    /// <returns>Returns added incident</returns>
    public Task AddIncident(Incident incident);

    /// <summary>
    /// This method remove incident by its associated id
    /// </summary>
    /// <param name="id">incident id guid</param>
    /// <returns></returns>
    public Task RemoveIncident(Guid id);

    /// <summary>
    /// This method update an incident 
    /// </summary>
    /// <param name="incident">incident model with new data</param>
    /// <returns>Updated incident</returns>
    Task<Incident> UpdateIncident(Incident incident);

    /// <summary>
    /// This method get all incidents from database
    /// </summary>
    /// <returns>A list with all incidents from database</returns>
    public Task<IEnumerable<Incident>> GetAllIncidents();

    /// <summary>
    /// This method get incident by its associated id
    /// </summary>
    /// <param name="id">incident id guid</param>
    /// <returns>found incident, else throw repository exception</returns>
    public Task<Incident> GetIncidentById(Guid id);

    /// <summary>
    /// This method get all incidents by a vehicle id
    /// </summary>
    /// <param name="vehicleId">vehicle id guid</param>
    /// <returns>A list with incidents by vehicle id</returns>
    public Task<IEnumerable<Incident>> GetIncidentsByVehicleId(Guid vehicleId);

    /// <summary>
    /// This method get count of incidents by their user owner name
    /// </summary>
    /// <param name="owner">user owner name</param>
    /// <returns>Integer representing count of incidents having given owner</returns>
    public Task<int> GetIncidentsCountOfUser(string owner);
}