using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class LoginResult
    {
        public int Id { get; }
        public string Username { get; }
        public string Role { get; }
        public string Token { get; }
        public LoginResult(int id, string username, string role, string token)
        {
            this.Id = id;
            this.Username = username;
            this.Role = role;
            this.Token = token;
        }
    }
}
