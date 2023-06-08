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

    /// <summary>
    /// This method add a vehicle in the database
    /// </summary>
    /// <param name="vehicle">Vehicle model</param>
    /// <returns>Ok with added vehicle if user is authentificated, otherwise unauthorized</returns>
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

    /// <summary>
    /// This method get all vehicles
    /// </summary>
    /// <returns>A list with all vehicles in database</returns>
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

    /// <summary>
    /// This method get vehicle by its associated id
    /// </summary>
    /// <param name="vehicleId">vehicle id guid</param>
    /// <returns>Ok with found vehicle, otherwise bad request with associated error message</returns>
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

    /// <summary>
    /// This function get vehicle with its associated data by vehicle id
    /// </summary>
    /// <param name="vehicleId">vehicle id guid</param>
    /// <returns>Ok with the found vehicle otherwise bad request with error message</returns>
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

    /// <summary>
    /// Delete vehicle 
    /// </summary>
    /// <param name="vehicle">vehicle model</param>
    /// <returns>Forbid if the vehicle's user owner is different than request user, otherwise Ok if the vehicle was
    /// deleted successfully, else bad request with associated error message</returns>
    [HttpDelete]
    [Route("delete")]
    public async Task<IActionResult> DeleteVehicle([FromBody] Vehicle vehicle)
    {
        try
        {
            if (User.GetUserRole() == RolesEnum.Regular && vehicle.UserId != User.GetUserId())
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
            await _vehicleService.DeleteVehicle(vehicle);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// The method update a vehicle
    /// </summary>
    /// <param name="vehicle">vehicle model</param>
    /// <returns>Forbid if the vehicle's user owner is different than request user, otherwise Ok if the vehicle was
    /// updated successfully, else bad request with associated error message</returns>
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

    /// <summary>
    /// This method get a list of vehicle with engine capacity greater than capacity parameter
    /// </summary>
    /// <param name="capacity">int greater than 0</param>
    /// <returns>Ok with the list of vehicles having capacity greater than capacity parameter</returns>
    [HttpGet("get-vehicles-filtered/{capacity}")]
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehiclesWithCapacityGreater([FromRoute] int capacity)
    {
        var result = await _vehicleService.GetVehiclesWithCapacityGreaterThan(capacity);
        return Ok(result);
    }

    /// <summary>
    /// This method get all vehicles with their associated data
    /// </summary>
    /// <returns>A list with all vehicles and their associated data</returns>
    [HttpGet("get-all-vehicles-with-data")]
    public ActionResult<IEnumerable<Vehicle>> GetAllVehiclesWithAllData()
    {
        var result = _vehicleService.GetAllVehiclesWithAllData();
        return Ok(result);
    }

    /// <summary>
    /// This method get vehicles by their number of incidents
    /// </summary>
    /// <returns>A list with vehicles ordered by their number of incidents</returns>
    [HttpGet("get-by-incidents")]
    public async Task<ActionResult<IEnumerable<VehicleDTO>>> GetVehiclesByNumberOfIncidents()
    {
        var result = await _vehicleService.GetVehiclesOrderByNumberOfIncidents();
        return Ok(result);
    }

    /// <summary>
    /// This method update the Incidents ids to new vehicle
    /// </summary>
    /// <param name="vehicleId"></param>
    /// <param name="incidentIds"></param>
    /// <returns></returns>
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

    /// <summary>
    /// This method get all vehicles paginated
    /// </summary>
    /// <param name="skip">number of items to skip</param>
    /// <param name="take">number of items to take</param>
    /// <returns>Ok with a list with vehicles paginated</returns>
    [AllowAnonymous]
    [HttpGet("get-vehicles-paginated/{skip}/{take}")]
    public async Task<ActionResult<Pagination<VehicleDTO>>> GetVehiclesPaginated([FromRoute] int skip,
        [FromRoute] int take)
    {
        var result = await _vehicleService.GetVehiclesPaginated(skip, take);
        return Ok(result);
    }

    /// <summary>
    /// This method get vehicles by carplate
    /// </summary>
    /// <param name="carPlate">string respecting the format XXYYVVV where X and V are capital letters and Y is number 0-9</param>
    /// <returns></returns>
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