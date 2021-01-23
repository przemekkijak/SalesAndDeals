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
            return await _context.Scrapdevs.Select(s => new ScrapdevDTO(s.Id, s.Username, s.Role)).ToListAsync();
        }

        // GET: api/Scrapdevs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Scrapdev>> GetScrapdev(int id)
        {
            var scrapdev = await _context.Scrapdevs.FindAsync(id);

            if (scrapdev == null)
            {
                return NotFound();
            }

            return scrapdev;
        }


        // POST: api/Scrapdevs
        [HttpPost]
        public async Task<ActionResult<ScrapdevDTO>> PostScrapdev(Scrapdev scrapdev)
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

        //custom endpoints, for learning

        [HttpGet("createdScrapers/{username}")]
        public async Task<ActionResult<ScrapDetails>> UserScrapsCounter(string Username)
        {
            var dev = await _context.Scrapdevs.Where(s => s.Username.Equals(Username)).FirstAsync();
            var counter = await _context.Scrapers.Where(s => s.CreatedByName.Equals(Username)).CountAsync();
            return new ScrapDetails(dev, counter);
        }

    }
}
