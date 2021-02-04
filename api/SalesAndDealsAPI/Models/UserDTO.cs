using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public UserDTO(int id, string username, string role)
        {
            this.Id = id;
            this.Username = username;
            this.Role = role;
        }

        public UserDTO(User user)
        {
            this.Id = user.Id;
            this.Username = user.Username;
            this.Role = user.Role;
        }
    }

}
