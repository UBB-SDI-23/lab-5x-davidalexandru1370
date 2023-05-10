using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mpp1.Enums;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Service;
using mpp1.Service.Interfaces;

namespace mpp1.Controller;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;


    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    [Route("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult<AuthResult>> Register(RegisterCredentials user)
    {
        try
        {
            var authResult = await _userService.Register(user);
            if (authResult.Result == false)
            {
                return BadRequest(authResult);
            }

            return Ok(authResult);
        }
        catch (RepositoryException repositoryException)
        {
            return UnprocessableEntity(new AuthResult()
            {
                Error = repositoryException.Message,
                Result = false,
            });
        }
    }

    [HttpPost]
    [Route("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AuthResult>> Login(LoginCredentials loginCredentials)
    {
        try
        {
            var authResult = await _userService.Login(loginCredentials);
            if (authResult.Result == false)
            {
                return BadRequest(authResult);
            }

            return Ok(authResult);
        }
        catch (RepositoryException repositoryException)
        {
            var authResult = new AuthResult()
            {
                Result = false,
                Error = repositoryException.Message
            };
            return BadRequest(authResult);
        }
    }

    [HttpDelete("validate-account/{ValidationCode:guid}")]
    public async Task<ActionResult<AuthResult>> ValidateConfirmationCode([FromRoute] Guid ValidationCode)
    {
        try
        {
            var result = await _userService.ValidateAccount(ValidationCode);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(new AuthResult()
            {
                Error = repositoryException.Message,
                Result = false
            });
        }
    }

    [HttpGet("get-user/{username}")]
    public async Task<ActionResult<UserDto>> GetUserDataByUsername([FromRoute] string username)
    {
        try
        {
            var result = await _userService.GetUserDataByUsernameAsync(username);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [HttpPost("authorize")]
    public async Task<ActionResult<UserDto>> Authorize([FromBody] string token)
    {
        try
        {
            var userData = await _userService.Authorize(token);
            return Ok(userData);
        }
        catch (Exception exception) when (exception is RepositoryException or RentACarException)
        {
            return Forbid();
        }
    }

    [AllowAnonymous]
    [HttpGet("get-user-with-statistics/{username}")]
    public async Task<ActionResult<UserDto>> GetUserWithAllData([FromRoute] string username)
    {
        try
        {
            var result = await _userService.GetUserWithStatistics(username);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    [Authorize(Roles = nameof(RolesEnum.Admin))]
    [HttpGet("change-user-role/{userId:guid}/{newRole}")]
    public async Task<IActionResult> ChangeUserRole([FromRoute] Guid userId, [FromRoute] RolesEnum newRole)
    {
        try
        {
            await _userService.ChangeUserRole(userId, newRole);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }
}