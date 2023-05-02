using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Repository.Interfaces;

public interface IUserRepository
{
    public Task<User> AddUserAsync(UserDto user);
    public Task<User?> GetUserByNameAsync(string name);
    public Task<TokenValidationUser?> GetTokenConfirmationAccountByUserIdAsync(Guid userId);
    public Task DeleteTokenConfirmationAccountAsync(Guid tokenId);
    public Task DeleteUserByIdAsync(Guid userId);
}