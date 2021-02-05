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
            List<Shops> shops = await _context.Shops.Where(s => s.AssignedTo.Equals(userId) && s.RobotState.Equals("TODO") || s.RobotState.Equals("OK")).ToListAsync();
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


        //scrapers actions
        [HttpPut("assignTo/{userId}/{shopId}")]
        public async Task<IActionResult> AssignScraperTo(int userId, int shopId)
        {
                var updatedShop = new Shops()
                {
                    AssignedTo = userId,
                    Id = shopId,
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

        [HttpPut("changeState/{shopId}/{state}")]
        public async Task<IActionResult> ChangeScraperState(int shopId, string state)
        {
            var updatedShop = new Shops()
            {
                Id = shopId
            };
            switch(state)
            {
                case "EXECUTED" or "SUCCESS":
                    updatedShop.RobotState = state;
                    _context.Entry(updatedShop).Property("RobotState").IsModified = true;
                    break;
                case "CANTDOTHIS" or "NOOFFER":
                    updatedShop.RobotState = state;
                    updatedShop.AssignedTo = 0;
                    _context.Entry(updatedShop).Property("RobotState").IsModified = true;
                    _context.Entry(updatedShop).Property("AssignedTo").IsModified = true;
                    break;
                case "STILLNOOFFER":
                    updatedShop.LastChanged = DateTime.Now;
                    _context.Entry(updatedShop).Property("LastChanged").IsModified = true;
                    break;
            }
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
            return _context.Shops.Any(e => e.Id == id);
        }
    }
}
