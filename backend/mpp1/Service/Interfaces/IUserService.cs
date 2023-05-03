using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IUserService
{
    public Task<User> AddUser(RegisterCredentials user);
    public Task<AuthResult> Login(LoginCredentials user);
    public Task<AuthResult> Register(RegisterCredentials user);
    public Task<AuthResult> ValidateAccount(Guid validateCode);
    public Task<UserDto> GetUserDataByUsernameAsync(string username);
    public Task<UserDto> Authorize(string token);
}