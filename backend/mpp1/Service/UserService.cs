using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;
using mpp1.Service.Interfaces;

namespace mpp1.Service;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> AddUser(UserDto user)
    {
        return await _userRepository.AddUserAsync(user);
    }

    public Task<AuthResult> Login(LoginCredentials user)
    {
        throw new NotImplementedException();
    }

    public Task<AuthResult> Register(UserDto user)
    {
        throw new NotImplementedException();
    }
}