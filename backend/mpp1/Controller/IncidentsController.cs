using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Service;

namespace mpp1.Controller;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class IncidentsController : ControllerBase
{
    private IIncidentService _incidentService;

    public IncidentsController(IIncidentService incidentService)
    {
        _incidentService = incidentService;
    }

    /// <summary>
    /// This method add an incident into database
    /// </summary>
    /// <param name="incident">incident  model</param>
    /// <returns>Ok if the incident was added succesfully, bad request with the error message if incident model is invalid</returns>
    [HttpPost]
    [Route("add-incident")]
    public async Task<ActionResult<Incident>> AddIncident([FromBody] Incident incident)
    {
        try
        {
            await _incidentService.AddIncident(incident);
            return Ok(incident);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
        catch (ValidationException validationException)
        {
            return BadRequest(validationException.Message);
        }
    }

    /// <summary>
    /// This method returns a list with all incidents from database
    /// </summary>
    /// <returns>a list with all incidents from database</returns>
    [HttpGet]
    [Route("get-all-incidents")]
    public ActionResult<IEnumerable<Incident>> GetAllIncidents()
    {
        try
        {
            var result = _incidentService.GetAllIncidents();
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method return the incident by its associated id
    /// </summary>
    /// <param name="incidentId">incident id guid</param>
    /// <returns>Ok with the found incident otherwise bad request with error message</returns>
    [HttpGet]
    [Route("get-incident-by-id/{incidentId}")]
    public async Task<ActionResult<Incident>> GetIncidentById([FromRoute] Guid incidentId)
    {
        try
        {
            var result = await _incidentService.GetIncidentById(incidentId);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method delete incident by its id
    /// </summary>
    /// <param name="incidentId"></param>
    /// <returns>Ok if the incident was deleted successfully, otherwise bad request</returns>
    [HttpDelete]
    [Route("delete-incident/{incidentId}")]
    public async Task<IActionResult> DeleteIncidentById([FromRoute] Guid incidentId)
    {
        try
        {
            await _incidentService.RemoveIncident(incidentId);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method updates incident
    /// </summary>
    /// <param name="incident">Incident model</param>
    /// <returns>Ok with the updated incident if update was executed successfully, otherwise bad request with error message</returns>
    [HttpPut]
    [Route("update-incident")]
    public async Task<ActionResult<Incident>> UpdateIncident([FromBody] Incident incident)
    {
        try
        {
            var result = await _incidentService.UpdateIncident(incident);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method return the vehicle by its associated id
    /// </summary>
    /// <param name="vehicleId"> vehicle id guid</param>
    /// <returns>Ok with the associated vehicle otherwise bad request with the error message</returns>
    [HttpGet]
    [Route("get-by-vehicleId/{vehicleId}")]
    public async Task<ActionResult<IEnumerable<Incident>>> GetIncidentsByVehicleId([FromRoute] Guid vehicleId)
    {
        try
        {
            var result = await _incidentService.GetIncidentsByVehicleId(vehicleId);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }
}