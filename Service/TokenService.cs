

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Service;

public class TokenService (IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenKey = config["tokenKey"] ?? throw new Exception("Can not get token key");
        if(tokenKey.Length < 64) throw new Exception("Your tokenKey needs to be >= 64 characers");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var Claims = new List<Claim>
        {
            
        new(ClaimTypes.Email, user.Email),
        new(ClaimTypes.NameIdentifier, user.Id)

        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokendescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(Claims),
            Expires = DateTime.UtcNow.AddDays(14),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokendescriptor);

        return tokenHandler.WriteToken(token);  
    }
}
