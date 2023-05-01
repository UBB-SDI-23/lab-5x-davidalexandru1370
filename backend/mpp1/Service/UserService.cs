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

    public Task<AuthResult> Login(LoginCredentials user)
    {
        throw new NotImplementedException();
    }

    public Task<AuthResult> Register(UserDto user)
    {
        throw new NotImplementedException();
    }

    private string generateJwtTokenForUser(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_appSettings["JwtSettings:Key"]);
        TimeSpan tokenLifetime = TimeSpan.FromHours(8);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id",user.Id.ToString())
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