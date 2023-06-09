using mpp1.Enums;
using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Repository.Interfaces;

public interface IUserRepository
{
    /// <summary>
    /// This method add a new user in database
    /// </summary>
    /// <param name="user">register credentials</param>
    /// <returns>added user in database</returns>
    public Task<User> AddUserAsync(RegisterCredentials user);

    /// <summary>
    /// This method get user by its name
    /// </summary>
    /// <param name="name">user name string</param>
    /// <returns>found user by its name</returns>
    public Task<User?> GetUserByNameAsync(string name);

    /// <summary>
    /// This method get confirmation account by user name
    /// </summary>
    /// <param name="userId">user id guid</param>
    /// <returns>Token for user</returns>
    public Task<TokenValidationUser?> GetTokenConfirmationAccountByUserIdAsync(Guid userId);

    /// <summary>
    /// This method delete token confirmation account by its id
    /// </summary>
    /// <param name="tokenId">token id guid</param>
    /// <returns></returns>
    public Task DeleteTokenConfirmationAccountAsync(Guid tokenId);

    /// <summary>
    /// This method generate a token confirmation account by user id
    /// </summary>
    /// <param name="userId">user id guid</param>
    /// <returns>token validation user</returns>
    public Task<TokenValidationUser> GenerateTokenConfirmationAccountAsync(Guid userId);

    /// <summary>
    /// This method get token confirmation account by id
    /// </summary>
    /// <param name="tokenId">token id guid</param>
    /// <returns>token validation if exists otherwise throw repository exception</returns>
    public Task<TokenValidationUser> GetTokenConfirmationAccountById(Guid tokenId);

    /// <summary>
    /// The method delete user by its id
    /// </summary>
    /// <param name="userId">user id guid</param>
    /// <returns></returns>
    public Task DeleteUserByIdAsync(Guid userId);

    /// <summary>
    /// This method get user by its id
    /// </summary>
    /// <param name="id">user id guid</param>
    /// <returns>found user else throw repository exception</returns>
    public Task<User> GetUserById(Guid id);

    /// <summary>
    /// This method get user data by its username
    /// </summary>
    /// <param name="username">user name string</param>
    /// <returns>User with associated data</returns>
    public Task<UserDto> GetUserDataByUsername(string username);

    /// <summary>
    /// This method get user data by its id
    /// </summary>
    /// <param name="userId">user id string</param>
    /// <returns>User with associated data</returns>
    public Task<UserDto> GetUserDataByIdAsync(Guid userId);

    /// <summary>
    /// This method change user role
    /// </summary>
    /// <param name="userName">user name - string</param>
    /// <param name="newRole">user role - role enum</param>
    /// <returns></returns>
    public Task ChangeUserRole(string userName, RolesEnum newRole);

    /// <summary>
    /// This method updates the number of items every user sees on a page
    /// </summary>
    /// <param name="numberOfItemsPerPage">integer</param>
    /// <returns></returns>
    public Task UpdateNumberOfItemsPerPage(int numberOfItemsPerPage);

    /// <summary>
    /// This method add a new message in database corresponding to user
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    public Task AddMessage(MessageDTO message);

    /// <summary>
    /// This method get messages by username
    /// </summary>
    /// <param name="username">user name string</param>
    /// <returns>A list with messages for given user name</returns>
    public Task<IEnumerable<MessageDTO>> GetMessagesByUsername(string username);
}