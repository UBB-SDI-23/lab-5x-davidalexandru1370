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

    /// <summary>
    /// Register user endpoint using register credentials
    /// </summary>
    /// <param name="user"></param>
    /// <returns>Ok with authentification result if credentials are ok , bad request otherwise</returns>
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

    /// <summary>
    /// Login endpoint with authentificate a user by his credentials
    /// </summary>
    /// <param name="loginCredentials"></param>
    /// <returns>Ok with authentification result if credentials are ok , bad request otherwise</returns>
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

    /// <summary>
    /// Validate user account after the user register his account
    /// </summary>
    /// <param name="ValidationCode"></param>
    /// <returns>Ok with authentification result if credentials are ok , bad request otherwise</returns>
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

    /// <summary>
    /// Get user data by his name
    /// </summary>
    /// <param name="username">user name</param>
    /// <returns>user name</returns>
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

    /// <summary>
    /// This method authorize user and get his data if user is authorized
    /// </summary>
    /// <param name="token">token that identifies the user</param>
    /// <returns>User data</returns>
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

    /// <summary>
    /// This method returns user by its name and returns the user with all his associated data
    /// </summary>
    /// <param name="username"></param>
    /// <returns>User with associated data if username exists otherwise bad request with error message</returns>
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


    /// <summary>
    /// Change user role 
    /// </summary>
    /// <param name="userName">user name</param>
    /// <param name="newRole">new role</param>
    /// <returns>Ok if the username exists and role is changed otherwise bad request with error message associated</returns>
    [Authorize(Roles = nameof(RolesEnum.Admin))]
    [HttpPut("change-user-role/{userName}/{newRole}")]
    public async Task<IActionResult> ChangeUserRole([FromRoute] string userName, [FromRoute] RolesEnum newRole)
    {
        try
        {
            await _userService.ChangeUserRole(userName, newRole);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
    }

    /// <summary>
    /// Run the data generation scripts
    /// </summary>
    /// <returns>Return  ok if the scripts was ran succesfully otherwise bad request</returns>
    [Authorize(Roles = nameof(RolesEnum.Admin))]
    [HttpPost("run-data-generation-scripts")]
    public async Task<IActionResult> RunDataGenerationScripts()
    {
        try
        {
            await _userService.RunDataGenerationScripts();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    
    /// <summary>
    /// This function update the number of items users can see o a page
    /// </summary>
    /// <param name="numberOfItemsPerPage"></param>
    /// <returns>Ok</returns>
    [Authorize(Roles = nameof(RolesEnum.Admin))]
    [HttpPut("change-number-of-items-per-page/{numberOfItemsPerPage:int}")]
    public async Task<IActionResult> UpdateNumberOfItemsPerPage(int numberOfItemsPerPage)
    {
        await _userService.ChangeNumberOfItemsPerPage(numberOfItemsPerPage);
        return Ok();
    }

    /// <summary>
    /// This method returns all the messages has sent in past 
    /// </summary>
    /// <param name="username"></param>
    /// <returns>A list with all messages a user sent in past, empty list if otherwise</returns>
    [HttpGet]
    [Route("get-messages-by-user/{username}")]
    public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessagesByUser([FromRoute] string username)
    {
        var result = await _userService.GetMessageByUsername(username);
        return Ok(result);
    }

    
    /// <summary>
    /// This method returns next word prediction messages for a given message
    /// </summary>
    /// <param name="message"></param>
    /// <returns>A list with 5 elements for the next suggested words</returns>
    [AllowAnonymous]
    [HttpPost("get-suggestions-message")]
    public async Task<IEnumerable<String>?> SuggestsMessage([FromBody] string message)
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetAsync($"http://localhost:5001/predict-next-word?sentence={message}");
        var suggestedMessages = await response.Content.ReadFromJsonAsync<IEnumerable<String>>();
        return suggestedMessages;
    }
}