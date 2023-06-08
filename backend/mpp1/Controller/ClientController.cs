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
public class ClientController : ControllerBase
{
    private IClientService _clientService;


    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }

    /// <summary>
    /// This method add client in database
    /// </summary>
    /// <param name="client">Client model</param>
    /// <returns>The added client in database with associated id</returns>
    [HttpPost("add-client")]
    public async Task<ActionResult<Client>> AddClient([FromBody] Client client)
    {
        try
        {
            client.UserId = User.GetUserId();
            if (User.GetUserRole() == RolesEnum.Regular && client.UserId != User.GetUserId())
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
            await _clientService.AddClient(client);
            return Ok(client);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method delete a client from database
    /// </summary>
    /// <param name="client"></param>
    /// <returns>
    /// Forbid if the client user owner is not the same with the incoming request user
    /// Bad request if the client model is invalid or not found in database
    /// Ok if the client is deleted successfully
    /// </returns>
    [HttpDelete("delete-client")]
    public async Task<IActionResult> DeleteClient([FromBody] Client client)
    {
        try
        {
            client.UserId = User.GetUserId();
            if (User.GetUserRole() == RolesEnum.Regular && client.UserId != User.GetUserId())
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
            await _clientService.RemoveClient(client);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method returns the client by its id
    /// </summary>
    /// <param name="clientId">client id guid</param>
    /// <returns>
    /// Returns ok with the client if it is found in database, otherwise bad request with associated error message
    /// </returns>
    [HttpGet("get-client/{clientId}")]
    public async Task<ActionResult<Client>> GetClientById([FromRoute] Guid clientId)
    {
        try
        {
            var result = await _clientService.GetClientById(clientId);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// Return a list with all the clients from database
    /// </summary>
    /// <returns>
    /// Ok with a list with all clients from database
    /// </returns>
    [HttpGet("get-clients")]
    public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
    {
        var result = await _clientService.GetAllClients();
        return Ok(result);
    }

    /// <summary>
    /// This method update a client
    /// </summary>
    /// <param name="client"></param>
    /// <returns>Ok with updated client if updated was succesfully otherwise bad request with error message</returns>
    [HttpPut("update-client")]
    public async Task<ActionResult<Client>> UpdateClient([FromBody] Client client)
    {
        try
        {
            if (User.GetUserRole() == RolesEnum.Regular && client.UserId != User.GetUserId())
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
            var result = await _clientService.UpdateClient(client);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// This method returns all the clients paginated
    /// </summary>
    /// <param name="skip">integer number greater than 0 which means how many items to skip</param>
    /// <param name="take">integer number greater than 0 which means how many items to take</param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpGet("get-clients-paginated/{skip}/{take}")]
    public async Task<ActionResult<Pagination<ClientDTO>>> GetClientsPaginated([FromRoute] uint skip,
        [FromRoute] uint take)
    {
        var result = await _clientService.GetClientsPaginated((int)skip, (int)take);
        return Ok(result);
    }
    
        
    [HttpGet("get-clients-by-name/{name}")]
    public async Task<ActionResult<IEnumerable<Client>>> GetClientsByName([FromRoute] string name)
    {
        try
        {
            var result = await _clientService.GetClientsByName(name);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }
}