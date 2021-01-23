using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using SalesAndDealsAPI.Models;

namespace SalesAndDealsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly SnDContext _context;
        public IConfiguration _configuration;

        public LoginController(IConfiguration config, SnDContext context)
        {

            _context = context;
            _configuration = config;
        }

        [HttpPost]
        public async Task<IActionResult> Login(Login _userData)
        {
            if(_userData != null && _userData.Username != null && _userData.Password != null)
            {
                var user = await GetUser(_userData.Username, _userData.Password);
                if(user != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Id", user.Id.ToString()),
                        new Claim("Username", user.Username),
                        new Claim("Role", user.Role)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                } 
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        public async Task<Scrapdev> GetUser(string username, string password)
        {
            return await _context.Scrapdevs.FirstOrDefaultAsync(u => u.Username.Equals(username) && u.Password.Equals(password));
        }


    }
}
