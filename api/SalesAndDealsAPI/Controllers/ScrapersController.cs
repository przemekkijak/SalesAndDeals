using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesAndDealsAPI.Models;

namespace SalesAndDealsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScrapersController : ControllerBase
    {
        private readonly SnDContext _context;

        public ScrapersController(SnDContext context)
        {
            _context = context;
        }

        [HttpGet("todo/{userId}")]
        public async Task<ActionResult<IEnumerable<ShopsDTO>>> GetTodoScrapersForUser(int userId)
        {
            List<Shops> shops = await _context.Shops.Where(s => s.AssignedTo.Equals(userId) && s.RobotState.Equals("TODO")).ToListAsync();
            List<ShopsDTO> result = new List<ShopsDTO>();
            foreach(Shops shop in shops)
            {
                string countryCode = (string)await _context.Countries.Where(c => c.CountryId.Equals(shop.CountryId)).Select(s => s.CountryCode).FirstOrDefaultAsync();
                ShopsDTO resultDTO = new ShopsDTO(shop)
                {
                    Name = $"{countryCode}/{shop.Name}"
                };
                result.Add(resultDTO);
            }
            return result;
        }

        private bool ShopsExists(int id)
        {
            return _context.Shops.Any(e => e.Id == id);
        }
    }
}
