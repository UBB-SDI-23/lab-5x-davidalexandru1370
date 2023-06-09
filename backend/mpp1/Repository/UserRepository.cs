using Microsoft.EntityFrameworkCore;
using mpp1.DatabaseContext;
using mpp1.Enums;
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

    public async Task<User> AddUserAsync(RegisterCredentials user)
    {
        if (user is null)
        {
            throw new RepositoryException("Invalid user");
        }

        var addedUser = await _rentACarDbContext.Set<User>().AddAsync(new User
        {
            Name = user.Username,
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

        await _rentACarDbContext.SaveChangesAsync();

        return addedUser.Entity;
    }

    public async Task<User?> GetUserByNameAsync(string name)
    {
        if (name is null)
        {
            throw new RepositoryException("Invalid name");
        }

        var user = await _rentACarDbContext.Set<User>().Where(u => u.Name == name).FirstOrDefaultAsync();

        return user;
    }

    public async Task<TokenValidationUser?> GetTokenConfirmationAccountByUserIdAsync(Guid userId)
    {
        var result = await _rentACarDbContext.Set<TokenValidationUser>().Where(t => t.UserId == userId)
            .FirstOrDefaultAsync();
        return result;
    }

    public async Task DeleteTokenConfirmationAccountAsync(Guid tokenId)
    {
        var token = await _rentACarDbContext.Set<TokenValidationUser>().FirstOrDefaultAsync(t => t.Id == tokenId);

        if (token is null)
        {
            throw new RepositoryException("Invalid token!");
        }

        _rentACarDbContext.Set<TokenValidationUser>().Remove(token);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task<TokenValidationUser> GenerateTokenConfirmationAccountAsync(Guid userId)
    {
        var user = await _rentACarDbContext.Set<User>().FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null)
        {
            throw new RepositoryException("Invalid user!");
        }

        var token = await _rentACarDbContext.Set<TokenValidationUser>().AddAsync(new TokenValidationUser
        {
            IssuedAt = DateTime.Now.ToUniversalTime(),
            UserId = userId
        });

        await _rentACarDbContext.SaveChangesAsync();

        return token.Entity;
    }

    public async Task<TokenValidationUser> GetTokenConfirmationAccountById(Guid tokenId)
    {
        var token = await _rentACarDbContext.Set<TokenValidationUser>().FirstOrDefaultAsync(t => t.Id == tokenId);

        if (token is null)
        {
            throw new RepositoryException("Invalid token!");
        }

        return token;
    }

    public async Task DeleteUserByIdAsync(Guid userId)
    {
        var user = await _rentACarDbContext.Set<User>().FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null)
        {
            throw new RepositoryException("Invalid user!");
        }

        _rentACarDbContext.Set<User>().Remove(user);
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task<User> GetUserById(Guid id)
    {
        var user = await _rentACarDbContext.Set<User>().FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
        {
            throw new RepositoryException("Invalid user");
        }

        return user;
    }

    public async Task<UserDto> GetUserDataByUsername(string username)
    {
        var user = await _rentACarDbContext.Set<UserProfile>()
            .Where(u => u.User.Name == username)
            .Include(x => x.User)
            .FirstOrDefaultAsync();

        if (user is null)
        {
            throw new RepositoryException("User does not exist!");
        }

        var userDto = new UserDto()
        {
            Bio = user.Bio,
            Birthday = user.Birthday,
            Gender = user.Gender,
            Location = user.Location,
            Username = user.User.Name,
            MaritalStatus = user.MaritalStatus,
            Role = user.User.Role
        };

        return userDto;
    }

    public Task<UserDto> GetUserDataByIdAsync(Guid userId)
    {
        var user = _rentACarDbContext.Set<UserProfile>()
            .Where(u => u.UserId == userId)
            .Include(u => u.User)
            .FirstOrDefault();

        if (user is null)
        {
            throw new RepositoryException("Invalid user");
        }

        int numberOfItemsPerPage = 12;

        if (_rentACarDbContext.Set<Preferences>().Count() > 0)
        {
            numberOfItemsPerPage = _rentACarDbContext.Set<Preferences>().FirstOrDefault().NumberOfItemsPerPage;
        }

        var result = new UserDto()
        {
            Bio = user.Bio,
            Birthday = user.Birthday,
            Gender = user.Gender,
            Location = user.Location,
            NumberOfItemsPerPage = numberOfItemsPerPage,
            Username = user.User.Name,
            MaritalStatus = user.MaritalStatus,
            Role = user.User.Role
        };


        return Task.FromResult(result);
    }

    public async Task ChangeUserRole(string userName, RolesEnum newRole)
    {
        var user = await GetUserByNameAsync(userName);

        user.Role = newRole;

        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task UpdateNumberOfItemsPerPage(int numberOfItemsPerPage)
    {
        if (_rentACarDbContext.Set<Preferences>().Count() == 0)
        {
            await _rentACarDbContext.Set<Preferences>().AddAsync(new Preferences()
            {
                NumberOfItemsPerPage = numberOfItemsPerPage
            });
        }
        else
        {
            _rentACarDbContext.Set<Preferences>().FirstOrDefault().NumberOfItemsPerPage = numberOfItemsPerPage;
        }

        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task AddMessage(MessageDTO message)
    {
        await _rentACarDbContext.Set<Message>().AddAsync(new Message
        {
            Username = message.Username,
            Text = message.Text
        });
        await _rentACarDbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<MessageDTO>> GetMessagesByUsername(string username)
    {
        var result = _rentACarDbContext.Set<Message>().Where(m => m.Username == username).Select(x => new MessageDTO()
        {
            Text = x.Text,
            Username = x.Username,
        }) as IEnumerable<MessageDTO>;
        return result;
    }
}