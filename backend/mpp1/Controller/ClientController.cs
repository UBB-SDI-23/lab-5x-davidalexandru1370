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

    [HttpDelete("delete-client")]
    public async Task<IActionResult> DeleteClient([FromBody] Client client)
    {
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

    [HttpGet("get-clients")]
    public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
    {
        var result = await _clientService.GetAllClients();
        return Ok(result);
    }

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