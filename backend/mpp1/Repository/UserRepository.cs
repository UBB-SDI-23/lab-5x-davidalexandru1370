using Microsoft.EntityFrameworkCore;
using mpp1.DatabaseContext;
using mpp1.Exceptions;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;

namespace mpp1.Repository;

public class UserRepository : IUserRepository
{
    private readonly RentACarDbContext _rentACarDbContext;

    public UserRepository(RentACarDbContext rentACarDbContext)
    {
        _rentACarDbContext = rentACarDbContext;
    }

    public async Task<User> AddUserAsync(UserDto user)
    {
        if (user is null)
        {
            throw new RepositoryException("Invalid user");
        }

        var addedUser = await _rentACarDbContext.Set<User>().AddAsync(new User
        {
            Name = user.Name,
            Password = user.Password
        });

        if (addedUser.State != EntityState.Added)
        {
            throw new RepositoryException("User was not saved successfully!");
        }

        await _rentACarDbContext.Set<UserProfile>().AddAsync(new UserProfile()
        {
            UserId = addedUser.Entity.Id,
            Bio = user.Bio,
            Birthday = user.Birthday,
            Gender = user.Gender,
            Location = user.Location,
            MaritalStatus = user.MaritalStatus
        });

        return addedUser.Entity;
    }
}