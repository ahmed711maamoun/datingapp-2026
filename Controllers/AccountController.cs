using System;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.Unicode;
using System.Threading.Tasks.Dataflow;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController (AppDbContext context, ITokenService tokenService): BaseApiController
{
    [HttpPost("register")]

    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
    {
        if (await EmailExists(registerDto.Email)) return BadRequest("Email Taken");
        
        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
          DisplayName = registerDto.DisplayName,
          Email = registerDto.Email,
          PassowrdHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
          PassowrdSalt = hmac.Key  
        };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user.ToDto(tokenService);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDTO.Email);

        if (user == null) return Unauthorized("Email adress is invalid");

        using var hmac = new HMACSHA512(user.PassowrdSalt);

        var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
    
        for (var i=0; i < ComputedHash.Length; i++)
        {
            if (ComputedHash[i] != user.PassowrdHash[i]) return Unauthorized("Invalid Password");

            
        }
        
         return user.ToDto(tokenService);
    }

    
    private async Task<bool> EmailExists(string Email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower() == Email.ToLower());
    }

}
