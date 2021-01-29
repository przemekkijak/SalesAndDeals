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
        public UserDTO(int Id, string Username, string Role)
        {
            this.Id = Id;
            this.Username = Username;
            this.Role = Role;
        }
    }

}
