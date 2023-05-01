using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Service.Interfaces;

public interface IUserService
{
    public Task<UserDto> AddUser(UserDto user);
    public Task<AuthResult> Login(LoginCredentials user);
    public Task<AuthResult> Register(UserDto user);
}