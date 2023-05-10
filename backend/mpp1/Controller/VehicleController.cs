using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mpp1.Enums;
using mpp1.Exceptions;
using mpp1.ExtensionMethods;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Service;
using mpp1.Service.Interfaces;

namespace mpp1.Controller;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class VehicleController : ControllerBase
{
    private readonly IVehicleService _vehicleService;
    private readonly IIncidentService _incidentService;

    public VehicleController(IVehicleService vehicleService, IIncidentService incidentService)
    {
        _vehicleService = vehicleService;
        _incidentService = incidentService;
    }

    [HttpPost]
    [Route("add-vehicle")]
    public async Task<ActionResult<Vehicle>> AddVehicle([FromBody] Vehicle vehicle)
    {
        try
        {
            vehicle.UserId = User.GetUserId();
            await _vehicleService.AddVehicle(vehicle);
            return Ok(vehicle);
        }
        catch (RentACarException)
        {
            return Unauthorized();
        }
    }

    [HttpGet]
    [Route("get-all")]
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetAllVehicles()
    {
        try
        {
            var result = await _vehicleService.GetAllVehicles();
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [HttpGet]
    [Route("get/{vehicleId}")]
    public async Task<ActionResult<Vehicle>> GetVehicleById([FromRoute] Guid vehicleId)
    {
        try
        {
            var result = await _vehicleService.GetVehicleById(vehicleId);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [HttpGet]
    [Route("get-with-data/{vehicleId}")]
    public async Task<ActionResult<Vehicle>> GetVehicleWithAllData([FromRoute] Guid vehicleId)
    {
        try
        {
            var result = await _vehicleService.GetVehicleByIdWithAllData(vehicleId);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [HttpDelete]
    [Route("delete/{vehicleId}")]
    public async Task<IActionResult> DeleteVehicle([FromRoute] Guid vehicleId)
    {
        try
        {
            await _vehicleService.DeleteVehicle(vehicleId);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [HttpPut]
    [Route("update")]
    public async Task<ActionResult<VehicleDTO>> UpdateVehicle([FromBody] Vehicle vehicle)
    {
        try
        {
            if (User.GetUserRole() == RolesEnum.Regular && User.GetUserId() != vehicle.UserId)
            {
                return Forbid();
            }
        }
        catch (RentACarException)
        {
            return Forbid();
        }


        try
        {
            var result = await _vehicleService.UpdateVehicle(vehicle);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [HttpGet("get-vehicles-filtered/{capacity}")]
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehiclesWithCapacityGreater([FromRoute] int capacity)
    {
        var result = await _vehicleService.GetVehiclesWithCapacityGreaterThan(capacity);
        return Ok(result);
    }

    [HttpGet("get-all-vehicles-with-data")]
    public ActionResult<IEnumerable<Vehicle>> GetAllVehiclesWithAllData()
    {
        var result = _vehicleService.GetAllVehiclesWithAllData();
        return Ok(result);
    }

    [HttpGet("get-by-incidents")]
    public async Task<ActionResult<IEnumerable<VehicleDTO>>> GetVehiclesByNumberOfIncidents()
    {
        var result = await _vehicleService.GetVehiclesOrderByNumberOfIncidents();
        return Ok(result);
    }

    [HttpPost("bulk-update/vehicle/{vehicleId}/incidents")]
    public async Task<IActionResult> UpdateBulkOfIncidentsByVehicleId([FromRoute] Guid vehicleId,
        [FromBody] IEnumerable<Guid> incidentIds)
    {
        try
        {
            await _incidentService.ChangeIncidentsIdToAnotherVehicleId(vehicleId, incidentIds);
            return Ok();
        }
        catch (RentACarException rentACarException)
        {
            return BadRequest(rentACarException.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("get-vehicles-paginated/{skip}/{take}")]
    public async Task<ActionResult<Pagination<VehicleDTO>>> GetVehiclesPaginated([FromRoute] int skip,
        [FromRoute] int take)
    {
        var result = await _vehicleService.GetVehiclesPaginated(skip, take);
        return Ok(result);
    }

    [HttpGet("get-vehicles-by-carPlate/{carPlate}")]
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehiclesByCarPlate([FromRoute] string carPlate)
    {
        try
        {
            var result = await _vehicleService.GetVehiclesByCarPlate(carPlate);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }
}