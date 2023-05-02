using System.Net;
using Microsoft.AspNetCore.Mvc;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Model.DTO;
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
    
    public async Task<ActionResult<AuthResult>> Register(UserDto user)
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
}