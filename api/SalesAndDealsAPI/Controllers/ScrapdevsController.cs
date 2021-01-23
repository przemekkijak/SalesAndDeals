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
    public class ScrapdevsController : ControllerBase
    {
        private readonly SnDContext _context;

        public ScrapdevsController(SnDContext context)
        {
            _context = context;
        }

        // GET: api/Scrapdevs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScrapdevDTO>>> GetScrapdevs()
        {
            return await _context.Scrapdevs.ToListAsync();
        }

        // GET: api/Scrapdevs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ScrapdevDTO>> GetScrapdev(int id)
        {
            var scrapdev = await _context.Scrapdevs.FindAsync(id);

            if (scrapdev == null)
            {
                return NotFound();
            }

            return scrapdev;
        }

        // PUT: api/Scrapdevs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScrapdev(int id, Scrapdev scrapdev)
        {
            if (id != scrapdev.Id)
            {
                return BadRequest();
            }

            _context.Entry(scrapdev).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScrapdevExists(id))
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

        // POST: api/Scrapdevs
        [HttpPost]
        public async Task<ActionResult<ScrapdevDTO>> PostScrapdev(ScrapdevDTO scrapdev)
        {
            _context.Scrapdevs.Add(scrapdev);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScrapdev", new { id = scrapdev.Id }, scrapdev);
        }

        // DELETE: api/Scrapdevs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScrapdev(int id)
        {
            var scrapdev = await _context.Scrapdevs.FindAsync(id);
            if (scrapdev == null)
            {
                return NotFound();
            }

            _context.Scrapdevs.Remove(scrapdev);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScrapdevExists(int id)
        {
            return _context.Scrapdevs.Any(e => e.Id == id);
        }

        [HttpGet("createdScrapers/{username}")]
        public async Task<ActionResult<ScrapDetails>> UserScrapsCounter(string Username)
        {
            var dev = await _context.Scrapdevs.Where(s => s.Username.Equals(Username)).FirstAsync();
            var counter = await _context.Scrapers.Where(s => s.CreatedByName.Equals(Username)).CountAsync();
            return new ScrapDetails(dev, counter);
        }

    }
}
