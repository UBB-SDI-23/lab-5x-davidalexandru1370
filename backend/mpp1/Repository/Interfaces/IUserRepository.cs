using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.Repository.Interfaces;

public interface IUserRepository
{
    Task<User> AddUserAsync(UserDto user);
    Task<User?> GetUserByNameAsync(string name);
}