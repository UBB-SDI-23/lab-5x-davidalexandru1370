using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using mpp1.Model;
using mpp1.Model.DTO;
using mpp1.Repository.Interfaces;
using mpp1.Service.Interfaces;

namespace mpp1.Service;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _appSettings;

    public UserService(IUserRepository userRepository, IConfiguration appSettings)
    {
        _userRepository = userRepository;
        _appSettings = appSettings;
    }

    public async Task<User> AddUser(UserDto user)
    {
        return await _userRepository.AddUserAsync(user);
    }

    public async Task<AuthResult> Login(LoginCredentials loginCredentials)
    {
        var authResult = new AuthResult();
        var alreadyExistingUser = await _userRepository.GetUserByNameAsync(loginCredentials.Name);

        if (alreadyExistingUser is null)
        {
            authResult.Error = "Invalid name or password!";
            authResult.Result = false;
            return authResult;
        }

        if (BCrypt.Net.BCrypt.Verify(loginCredentials.Password, alreadyExistingUser.Password) is false)
        {
            authResult.Error = "Invalid name or password!";
            authResult.Result = false;
            return authResult;
        }

        var token = GenerateJwtTokenForUser(alreadyExistingUser);

        authResult.Result = true;
        authResult.AccessToken = token;
        return authResult;
    }

    public async Task<AuthResult> Register(UserDto user)
    {
        var authResult = new AuthResult();

        //TODO: validate user password 
        var alreadyExistingUser = await _userRepository.GetUserByNameAsync(user.Name);
        
        if (alreadyExistingUser is not null)
        {
            authResult.Error = "There exists an account associated with this username";
            authResult.Result = false;
            return authResult;
        }

        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        var addedUser = await _userRepository.AddUserAsync(user);

        var token = GenerateJwtTokenForUser(addedUser);
        
        authResult.Result = true;
        authResult.AccessToken = token;
        
        return authResult;
    }

    private string GenerateJwtTokenForUser(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_appSettings["JwtSettings:Key"]);
        TimeSpan tokenLifetime = TimeSpan.FromHours(8);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.Add(tokenLifetime),
            Audience = _appSettings["JwtSettings:Audience"],
            Issuer = _appSettings["JwtSettings:Issuer"],
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        var jwt = tokenHandler.WriteToken(token);

        return jwt;
    }
}