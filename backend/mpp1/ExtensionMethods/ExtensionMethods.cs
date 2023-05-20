using System.Security.Claims;
using mpp1.Enums;
using mpp1.Exceptions;

namespace mpp1.ExtensionMethods;

public static class ExtensionMethods
{
    public static Guid GetUserId(this ClaimsPrincipal claimsPrincipal)
    {
        if (claimsPrincipal is null)
        {
            throw new RentACarException("Invalid user");
        }

        try
        {
            var userId = Guid.Parse(claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            return userId;
        }
        catch (FormatException)
        {
            throw new RentACarException("Invalid user");
        }
    }

    public static RolesEnum GetUserRole(this ClaimsPrincipal claimsPrincipal)
    {
        if (claimsPrincipal is null)
        {
            throw new RentACarException("Invalid user");
        }

        try
        {
            var userRole = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;
            return (RolesEnum)Enum.Parse(typeof(RolesEnum), userRole);
        }
        catch (Exception exception)
        {
            throw new RentACarException("Invalid user");
        }
    }
}