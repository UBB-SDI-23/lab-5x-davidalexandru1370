using Microsoft.AspNetCore.Mvc;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Service.Interfaces;

namespace mpp1.Controller;

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
            await _clientService.AddClient(client);
            return Ok(client);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [HttpDelete("delete-client/{clientId}")]
    public async Task<IActionResult> DeleteClient([FromRoute] Guid clientId)
    {
        try
        {
            await _clientService.RemoveClient(clientId);
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
            var result = await _clientService.UpdateClient(client);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [HttpGet("get-clients-paginated/{skip}/{take}")]
    public async Task<ActionResult<IEnumerable<Client>>> GetClientsPaginated([FromRoute] uint skip,
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