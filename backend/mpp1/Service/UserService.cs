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
        var alreadyExistingUser = await _userRepository.GetUserByNameAsync(loginCredentials.Username);

        if (alreadyExistingUser is null)
        {
            authResult.Error = "Invalid name or password!";
            authResult.Result = false;
            return authResult;
        }

        var userTokenConfirmAccount =
            await _userRepository.GetTokenConfirmationAccountByUserIdAsync(alreadyExistingUser.Id);

        if (userTokenConfirmAccount is not null)
        {
            authResult.Error = "Account is not confirmed!";
            authResult.Result = false;

            if (userTokenConfirmAccount.HasExpired)
            {
                await _userRepository.DeleteUserByIdAsync(alreadyExistingUser.Id);
            }

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

        var alreadyExistingUser = await _userRepository.GetUserByNameAsync(user.Username);

        if (alreadyExistingUser is not null)
        {
            authResult.Error = "There exists an account associated with this username";
            authResult.Result = false;
            return authResult;
        }

        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        var addedUser = await _userRepository.AddUserAsync(user);
        var confirmationToken = await _userRepository.GenerateTokenConfirmationAccountAsync(addedUser.Id);

        //var token = GenerateJwtTokenForUser(addedUser);

        authResult.Result = true;
        authResult.AccessToken = confirmationToken.Id.ToString();

        return authResult;
    }

    public async Task<AuthResult> ValidateAccount(Guid validateCode)
    {
        var token = await _userRepository.GetTokenConfirmationAccountById(validateCode);

        //await _userRepository.DeleteTokenConfirmationAccountAsync(validateCode);
        if (token.HasExpired)
        {
            await _userRepository.DeleteUserByIdAsync(token.UserId);
            return new AuthResult()
            {
                Error = "Expired validate account",
                Result = false
            };
        }
        else
        {
            var user = await _userRepository.GetUserById(token.UserId);
            var accessToken = GenerateJwtTokenForUser(user);
            await _userRepository.DeleteTokenConfirmationAccountAsync(token.Id);
            return new AuthResult()
            {
                Result = true,
                AccessToken = accessToken
            };
        }
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