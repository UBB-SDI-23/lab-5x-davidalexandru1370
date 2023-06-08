using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mpp1.Enums;
using mpp1.Exceptions;
using mpp1.ExtensionMethods;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Service.Interfaces;

namespace mpp1.Controller;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class VehicleRentController : ControllerBase
{
    private IVehicleRentService _vehicleRentService;

    public VehicleRentController(IVehicleRentService vehicleRentService)
    {
        _vehicleRentService = vehicleRentService;
    }

    /// <summary>
    /// This method returns all the rents from database
    /// </summary>
    /// <returns>Ok with a list containing all rents from database</returns>
    [HttpGet]
    [Route("get-all")]
    public ActionResult<IEnumerable<VehicleRent>> GetAllRents()
    {
        var result = _vehicleRentService.GetAllRents();
        return Ok(result);
    }

    /// <summary>
    /// This method add a rent into database
    /// </summary>
    /// <param name="vehicleRent">vehicle rent model</param>
    /// <returns>Unauthorized if the user is not authorized,
    /// Ok if the vehicle rent was added successfully, otherwise
    /// Bad request with associated error message
    /// </returns>
    [HttpPost]
    [Route("add-rent")]
    public async Task<IActionResult> AddRent([FromBody] VehicleRent vehicleRent)
    {
        try
        {
            vehicleRent.UserId = User.GetUserId();
            await _vehicleRentService.AddVehicleRent(vehicleRent);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
        catch (RentACarException)
        {
            return Unauthorized();
        }
    }

    /// <summary>
    /// The method get vehicle rent by their client associated id
    /// </summary>
    /// <param name="clientId">client id guid</param>
    /// <returns>a list with all the vehicle rents having given client id</returns>
    [HttpGet]
    [Route("get-by-clientId/{clientId}")]
    public ActionResult<IEnumerable<Vehicle>> GetVehiclesByClientId([FromRoute] Guid clientId)
    {
        var result = _vehicleRentService.GetVehiclesByClientId(clientId);
        return Ok(result);
    }

    /// <summary>
    /// The method get clients by their vehicle associated id
    /// </summary>
    /// <param name="vehicleId">vehicle id guid</param>
    /// <returns>A list with clients having as rent a vehicle with vehicle id given as parameter</returns>
    [HttpGet]
    [Route("get-by-vehicleId/{vehicleId}")]
    public ActionResult<IEnumerable<Client>> GetClientsByVehicleId([FromRoute] Guid vehicleId)
    {
        var result = _vehicleRentService.GetClientsByVehicleId(vehicleId);
        return Ok(result);
    }

    /// <summary>
    /// This method delete vehicle rent
    /// </summary>
    /// <param name="vehicleRent">vehicle rent</param>
    /// <returns>Ok if vehicle rent was deleted successfully, forbid if the owner of the rent is not the same as
    /// user having the request, otherwise ok</returns>
    [HttpDelete]
    [Route("delete-rent")]
    public async Task<IActionResult> DeleteVehicleRent([FromBody] VehicleRent vehicleRent)
    {
        try
        {
            if (User.GetUserRole() == RolesEnum.Regular && vehicleRent.UserId != User.GetUserId())
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
            await _vehicleRentService.DeleteVehicleRent(vehicleRent);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method get vehicle rent by its associated id
    /// </summary>
    /// <param name="vehicleRentId">vehicle rent id guid</param>
    /// <returns>Ok with vehicle rent if the vehicle rent id exists, otherwise bad request</returns>
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

    /// <summary>
    /// This method update vehicle rent
    /// </summary>
    /// <param name="vehicleRent">vehicle rent model</param>
    /// <returns>Ok if vehicle rent was updated successfully, forbid if the owner of the rent is not the same as
    /// user having the request, otherwise ok</returns>
    [HttpPut]
    [Route("update-vehicleRent")]
    public async Task<ActionResult<VehicleRent>> UpdateVehicleRent([FromBody] VehicleRent vehicleRent)
    {
        try
        {
            if (User.GetUserRole() == RolesEnum.Regular && vehicleRent.UserId != User.GetUserId())
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
            var result = await _vehicleRentService.UpdateVehicleRent(vehicleRent);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method gets the most active clients having the most rents
    /// </summary>
    /// <returns>A list with clients having the most rents sorted by number of rents descending</returns>
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

    /// <summary>
    /// This method get rents by their client id
    /// </summary>
    /// <param name="clientId">client id guid</param>
    /// <returns>Ok with a list of rents by their client id, otherwise bad request with error message</returns>
    [HttpGet("get-rents-by-clientId/{clientId}")]
    public async Task<ActionResult<int>> GetNumberOfRentsByClientId([FromRoute] Guid clientId)
    {
        try
        {
            var result = await _vehicleRentService.GetNumberOfRentsByClientId(clientId);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method return a list with vehicle rents paginated
    /// </summary>
    /// <param name="skip">number for elements to skip</param>
    /// <param name="take">number for elements to take</param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpGet("get-vehicleRents-paginated/{skip}/{take}")]
    public async Task<ActionResult<Pagination<VehicleRentDto>>> GetVehicleRentsPaginated(int skip, int take)
    {
        var result = await _vehicleRentService.GetVehicleRentsPaginated(skip, take);
        return Ok(result);
    }

    /// <summary>
    /// This method returns the number of rents in vehicle rents database
    /// </summary>
    /// <returns>Integer number with number of rents</returns>
    [HttpGet("get-number-of-rents")]
    public ActionResult<int> GetNumberOfRents()
    {
        return Ok(_vehicleRentService.GetNumberOfRents());
    }
}