using mpp1.Enums;
using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Repository.Interfaces;

public interface IUserRepository
{
    public Task<User> AddUserAsync(RegisterCredentials user);
    public Task<User?> GetUserByNameAsync(string name);
    public Task<TokenValidationUser?> GetTokenConfirmationAccountByUserIdAsync(Guid userId);
    public Task DeleteTokenConfirmationAccountAsync(Guid tokenId);
    public Task<TokenValidationUser> GenerateTokenConfirmationAccountAsync(Guid userId);
    public Task<TokenValidationUser> GetTokenConfirmationAccountById(Guid tokenId);
    public Task DeleteUserByIdAsync(Guid userId);
    public Task<User> GetUserById(Guid id);
    public Task<UserDto> GetUserDataByUsername(string username);
    public Task<UserDto> GetUserDataByIdAsync(Guid userId);
    public Task ChangeUserRole(string userName, RolesEnum newRole);
}