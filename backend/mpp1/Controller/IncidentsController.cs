using Microsoft.AspNetCore.Mvc;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Service;

namespace mpp1.Controller;


[ApiController]
[Route("api/[controller]")]
public class IncidentsController : ControllerBase
{
    private IIncidentService _incidentService;

    public IncidentsController(IIncidentService incidentService)
    {
        _incidentService = incidentService;
    }

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
    
    [HttpGet]
    [Route("get-incident-by-id/{incidentId}")]
    public async Task<ActionResult<Incident>> GetIncidentById([FromRoute]Guid incidentId)
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