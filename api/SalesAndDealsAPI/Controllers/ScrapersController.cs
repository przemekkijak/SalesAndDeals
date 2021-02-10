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

        [HttpGet("{userId}/{state}")]
        public async Task<ActionResult<IEnumerable<ShopsDTO>>> GetScrapersForUser(int userId, string state)
        {
            List<Shops> shops = new List<Shops>();
            if(userId != 0)
            {
                shops = await _context.Shops.Where(s => s.AssignedTo.Equals(userId) && s.RobotState.Equals(state)).ToListAsync();
            } else
            {
                shops = await _context.Shops.Where(s => s.RobotState.Equals(state)).ToListAsync();
            }
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

        [HttpPut("assignTo/{userId}/{shopId}")]
        public async Task<IActionResult> AssignScraperTo(int userId, int shopId)
        {
                var updatedShop = new Shops()
                {
                    AssignedTo = userId,
                    ShopId = shopId,
                    RobotState = "TODO"
                };
                _context.Entry(updatedShop).Property("AssignedTo").IsModified = true;
                _context.Entry(updatedShop).Property("RobotState").IsModified = true;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ShopsExists(shopId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            return Ok();
            }

        [HttpPut("changeState/{shopId}/{state}/{modifiedByName}")]
        public async Task<IActionResult> ChangeScraperState(int shopId, string state, string modifiedByName)
        {
            var updatedShop = new Shops()
            {
                ShopId = shopId,
                LastModifiedByName = modifiedByName,
                LastChanged = DateTime.Now
            };
            switch(state)
            {
                case "EXECUTED" or "SUCCESS" or "TODO" or "HARD":
                    updatedShop.RobotState = state;
                    _context.Entry(updatedShop).Property("RobotState").IsModified = true;
                    break;
                case "CANTDOTHIS" or "NOOFFER" or "OK":
                    updatedShop.RobotState = state;
                    updatedShop.AssignedTo = 0;
                    _context.Entry(updatedShop).Property("RobotState").IsModified = true;
                    _context.Entry(updatedShop).Property("AssignedTo").IsModified = true;
                    break;
            }
            _context.Entry(updatedShop).Property("LastModifiedByName").IsModified = true;
            _context.Entry(updatedShop).Property("LastChanged").IsModified = true;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!ShopsExists(shopId))
                {
                    return NotFound();
                } else
                {
                    throw;
                }
            }
            return Ok();
        }

        private bool ShopsExists(int id)
        {
            return _context.Shops.Any(e => e.ShopId == id);
        }
    }
}
