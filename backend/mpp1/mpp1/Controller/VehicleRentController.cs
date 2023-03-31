using Microsoft.AspNetCore.Mvc;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Service.Interfaces;

namespace mpp1.Controller;

[ApiController]
[Route("api/[controller]")]
public class VehicleRentController : ControllerBase
{

  private IVehicleRentService _vehicleRentService;

  public VehicleRentController(IVehicleRentService vehicleRentService)
  {
    _vehicleRentService = vehicleRentService;
  }

  [HttpGet]
  [Route("get-all")]
  public ActionResult<IEnumerable<VehicleRent>> GetAllRents()
  {
    var result = _vehicleRentService.GetAllRents();
    return Ok(result);
  }

  [HttpPost]
  [Route("add-rent")]
  public async Task<IActionResult> AddRent([FromBody] VehicleRent vehicleRent)
  {
    try
    {
      await _vehicleRentService.AddVehicleRent(vehicleRent);
      return Ok();
    }
    catch (RepositoryException repositoryException)
    {
      return BadRequest(repositoryException.Message);
    }
  }

  [HttpGet]
  [Route("get-by-clientId/{clientId}")]
  public ActionResult<IEnumerable<Vehicle>> GetVehiclesByClientId([FromRoute] Guid clientId)
  {
    var result = _vehicleRentService.GetVehiclesByClientId(clientId);
    return Ok(result);
  }

  [HttpGet]
  [Route("get-by-vehicleId/{vehicleId}")]
  public ActionResult<IEnumerable<Client>> GetClientsByVehicleId([FromRoute] Guid vehicleId)
  {
    var result = _vehicleRentService.GetClientsByVehicleId(vehicleId);
    return Ok(result);
  }

  [HttpDelete]
  [Route("delete-rent/{vehicleRentId}")]
  public async Task<IActionResult> DeleteVehicleRent([FromRoute] Guid vehicleRentId)
  {
    try
    {
      await _vehicleRentService.DeleteVehicleRent(vehicleRentId);
      return Ok();
    }
    catch (RepositoryException repositoryException)
    {
      return BadRequest(repositoryException.Message);
    }
  }

  [HttpGet]
  [Route("get-by-id/{vehicleRentId}")]
  public async Task<ActionResult<VehicleRent>> GetVehicleRentById([FromRoute] Guid vehicleRentId)
  {
    try
    {
      var result = await _vehicleRentService.GetVehicleRentById(vehicleRentId);
      return Ok(result);
    }
    catch (RepositoryException repositoryException)
    {
      return BadRequest(repositoryException.Message);
    }
  }

  [HttpPut]
  [Route("update-vehicleRent")]
  public async Task<ActionResult<VehicleRent>> UpdateVehicleRent([FromBody] VehicleRent vehicleRent)
  {
    try
    {
      var result = await _vehicleRentService.UpdateVehicleRent(vehicleRent);
      return Ok(result);
    }
    catch (RepositoryException repositoryException)
    {
      return BadRequest(repositoryException.Message);
    }
  }

  [HttpGet]
  [Route("get-active-clients")]
  public async Task<ActionResult<IEnumerable<ClientDTO>>> GetMostActiveClients()
  {
    try
    {
      var result = await _vehicleRentService.GetMostActiveClients();
      return Ok(result);
    }
    catch (RepositoryException repositoryException)
    {
      return BadRequest(repositoryException.Message);
    }
  }
}