using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesAndDealsAPI.Models;
using Microsoft.AspNetCore.Authorization;


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
            return await _context.Shops.Where(c => c.CountryId.Equals(id)).ToListAsync();
        }

        private bool ShopsExists(int id)
        {
            return _context.Shops.Any(e => e.Id == id);
        }
    }
}
