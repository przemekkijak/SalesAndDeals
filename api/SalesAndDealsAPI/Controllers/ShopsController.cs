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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        public readonly SnDContext _context;

        public ShopsController(SnDContext context)
        {
            _context = context;
        }

        // GET: api/Shops
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shops>>> GetShops()
        {
            return await _context.Shops.ToListAsync();
        }

        // GET: api/Shops/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shops>> GetShops(int id)
        {
            var shops = await _context.Shops.FindAsync(id);

            if (shops == null)
            {
                return NotFound();
            }

            return shops;
        }

        // PUT: api/Shops/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShops(int id, Shops shops)
        {
            if (id != shops.Id)
            {
                return BadRequest();
            }

            _context.Entry(shops).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopsExists(id))
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

        // POST: api/Shops
        [HttpPost]
        public async Task<ActionResult<Shops>> PostShops(Shops shops)
        {
            _context.Shops.Add(shops);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShops", new { id = shops.Id }, shops);
        }

        // DELETE: api/Shops/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShops(int id)
        {
            var shops = await _context.Shops.FindAsync(id);
            if (shops == null)
            {
                return NotFound();
            }

            _context.Shops.Remove(shops);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("forCountry/{id}")]
        public async Task<ActionResult<IEnumerable<Shops>>> GetShopsForCountry(int id)
        {
            DateTime today = DateTime.Today;
            List<Shops> shops = await _context.Shops.Where(c => c.CountryId.Equals(id)).ToListAsync();
            foreach (Shops shop in shops)
            {
                shop.ActiveOffers = _context.Results.Where(r => r.ShopId.Equals(shop.Id) && (r.EndDate >= today)).Count();
                shop.NotesAmount = _context.ShopNotes.Where(n => n.ShopId.Equals(shop.Id)).Count();
            }
            return shops;
        }
        private bool ShopsExists(int id)
        {
            return _context.Shops.Any(e => e.Id == id);
        }


        [HttpPut("fetchExecutions/{shopId}")]
        public async Task<ActionResult> FetchExecutionsForShop(int shopId)
        {
            if (ShopsExists(shopId))
            {
                var shop = await _context.Shops.Where(s => s.Id.Equals(shopId)).SingleOrDefaultAsync();
                HttpClient http = new HttpClient();
                http.DefaultRequestHeaders.Add("X-DexiIO-Access", DotNetEnv.Env.GetString("DEXIACCESS"));
                http.DefaultRequestHeaders.Add("X-DexiIO-Account", DotNetEnv.Env.GetString("DEXIACCOUNT"));
                http.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                string response = await http.GetAsync($"https://api.dexi.io/runs/{shop.DexiRun}/executions?limit=1").Result.Content.ReadAsStringAsync();
                JObject res = JObject.Parse(response);
                shop.LastExecuted = TimestampToDate.Parse((string)res.SelectToken("rows[0].finished"));
                shop.ExecutionState = (string)res.SelectToken("rows[0].state");

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
        public async Task<ActionResult>FetchExecutionsForAll()
        {
            HttpClient http = new HttpClient();
            http.DefaultRequestHeaders.Add("X-DexiIO-Access", DotNetEnv.Env.GetString("DEXIACCESS"));
            http.DefaultRequestHeaders.Add("X-DexiIO-Account", DotNetEnv.Env.GetString("DEXIACCOUNT"));
            http.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            var shopsIds = await _context.Shops.Select(s => s.Id).ToListAsync();
            foreach(var id in shopsIds)
            {
                await FetchExecutionsForShop(id);
            }
            return NoContent();
        }

    }
}
