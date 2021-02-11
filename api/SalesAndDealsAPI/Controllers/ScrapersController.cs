using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesAndDealsAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using SalesAndDealsAPI.Helpers;

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

        //scrapers view endpoints

        [HttpGet("{userId}/{state}")]
        public async Task<ActionResult<IEnumerable<ShopsDTO>>> GetScrapers(int userId, string state)
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
                Tag tag = await _context.Tags.Where(t => t.Name.Equals(shop.Tag)).FirstOrDefaultAsync();
                ShopsDTO resultDTO = new ShopsDTO(shop)
                {
                    Name = $"{countryCode}/{shop.Name}",
                    Tag = tag
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


        //shops view endpoints

        [HttpGet("forCountry/{id}")]
        public async Task<ActionResult<IEnumerable<ShopsDTO>>> GetShopsForCountry(int id)
        {
            DateTime today = DateTime.Today;
            List<Shops> shops = await _context.Shops.Where(c => c.CountryId.Equals(id)).ToListAsync();
            List<ShopsDTO> result = new List<ShopsDTO>();
            foreach (Shops shop in shops)
            {
                int activeOffers = _context.Results.Where(r => r.ShopId.Equals(shop.ShopId) && (r.EndDate >= today)).Count();
                Tag tag = await _context.Tags.Where(t => t.Name.Equals(shop.Tag)).FirstOrDefaultAsync();
                ShopsDTO resultDTO = new ShopsDTO(shop)
                {
                    Name = shop.Name,
                    ActiveOffers = activeOffers,
                    Tag = tag
                };
                result.Add(resultDTO);
            }
            return result;
        }

        //executions from dexi

        [HttpPut("fetchExecutions/{shopId}")]
        public async Task<ActionResult> FetchExecutionsForShop(int shopId)
        {
            if (ShopsExists(shopId))
            {
                var shop = await _context.Shops.Where(s => s.ShopId.Equals(shopId)).SingleOrDefaultAsync();
                HttpClient http = new HttpClient();
                http.DefaultRequestHeaders.Add("X-DexiIO-Access", DotNetEnv.Env.GetString("DEXIACCESS"));
                http.DefaultRequestHeaders.Add("X-DexiIO-Account", DotNetEnv.Env.GetString("DEXIACCOUNT"));
                http.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                string response = await http.GetAsync($"https://api.dexi.io/runs/{shop.DexiRun}/executions?limit=1").Result.Content.ReadAsStringAsync();
                Newtonsoft.Json.Linq.JObject res = JObject.Parse(response);
                shop.LastExecuted = TimestampToDate.Parse((string)res.SelectToken("rows[0].finished"));
                shop.ExecutionState = (string)res.SelectToken("rows[0].state");
                if ((shop.AssignedTo == 0 || shop.RobotState != "NOOFFER") && shop.ExecutionState == "FAILED")
                {
                    shop.RobotState = "FAILED";
                }

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
                return NoContent();
            }
            return NotFound();
        }

        [HttpPut("fetchExecutionsForAll")]
        public async Task<ActionResult> FetchExecutionsForAll()
        {
            HttpClient http = new HttpClient();
            http.DefaultRequestHeaders.Add("X-DexiIO-Access", DotNetEnv.Env.GetString("DEXIACCESS"));
            http.DefaultRequestHeaders.Add("X-DexiIO-Account", DotNetEnv.Env.GetString("DEXIACCOUNT"));
            http.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            var shopsIds = await _context.Shops.Select(s => s.ShopId).ToListAsync();
            foreach (var id in shopsIds)
            {
                await FetchExecutionsForShop(id);
            }
            return NoContent();
        }

        private bool ShopsExists(int id)
        {
            return _context.Shops.Any(e => e.ShopId == id);
        }
    }
}
