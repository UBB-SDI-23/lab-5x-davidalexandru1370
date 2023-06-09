using mpp1.Enums;
using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IUserService
{
    /// <summary>
    /// This method add a new user in database
    /// </summary>
    /// <param name="user">register credentials</param>
    /// <returns>added user in database</returns>
    public Task<User> AddUser(RegisterCredentials user);

    /// <summary>
    /// This method login in a user by checking its credentials
    /// </summary>
    /// <param name="user">login credentials</param>
    /// <returns>AuthResult with result being true if login succeed otherwise false</returns>
    public Task<AuthResult> Login(LoginCredentials user);

    /// <summary>
    /// This method register a new user
    /// </summary>
    /// <param name="user">register credentials</param>
    /// <returns>AuthResult with result being true if register succeed otherwise false</returns>
    public Task<AuthResult> Register(RegisterCredentials user);

    /// <summary>
    /// This method validate user account by its validating code
    /// </summary>
    /// <param name="validateCode">validate code - guid</param>
    /// <returns>AuthResult with result being true if validate account succeed otherwise false</returns>
    public Task<AuthResult> ValidateAccount(Guid validateCode);

    /// <summary>
    /// This method get user data by its username
    /// </summary>
    /// <param name="username">user name string</param>
    /// <returns>User with associated data</returns>
    public Task<UserDto> GetUserDataByUsernameAsync(string username);

    /// <summary>
    /// This method check if user has a valid token 
    /// </summary>
    /// <param name="token">user JWT token</param>
    /// <returns>user data if validation has succeed, otherwise throw RentACarException</returns>
    public Task<UserDto> Authorize(string token);

    /// <summary>
    /// This method get user with statistics
    /// </summary>
    /// <param name="username">user name - string</param>
    /// <returns>user dto if user with username is found, otherwise throw repository exception</returns>
    public Task<UserDto> GetUserWithStatistics(string username);

    /// <summary>
    /// This method change user role
    /// </summary>
    /// <param name="userName">user name - string</param>
    /// <param name="newRole">new role - roles enum</param>
    /// <returns></returns>
    public Task ChangeUserRole(string userName, RolesEnum newRole);

    /// <summary>
    /// This method run data generation scripts
    /// </summary>
    /// <returns></returns>
    public Task RunDataGenerationScripts();

    /// <summary>
    /// This method change number of items every user see on a page
    /// </summary>
    /// <param name="numberOfItemsPerPage"></param>
    /// <returns></returns>
    public Task ChangeNumberOfItemsPerPage(int numberOfItemsPerPage);

    /// <summary>
    /// This method a message for user
    /// </summary>
    /// <param name="message">message that user sent</param>
    /// <returns></returns>
    public Task AddMessageForUser(MessageDTO message);

    /// <summary>
    /// This method returns all messages of a user by its username
    /// </summary>
    /// <param name="username">user name</param>
    /// <returns>A list of user messages sent in past</returns>
    public Task<IEnumerable<MessageDTO>> GetMessageByUsername(string username);
}