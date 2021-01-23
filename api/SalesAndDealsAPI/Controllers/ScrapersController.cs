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

        // GET: api/Scrapers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Scraper>>> Getscrapers()
        {
            return await _context.Scrapers.ToListAsync();
        }

        // GET: api/Scrapers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Scraper>> GetScraper(int id)
        {
            var scraper = await _context.Scrapers.FindAsync(id);

            if (scraper == null)
            {
                return NotFound();
            }

            return scraper;
        }

        // PUT: api/Scrapers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScraper(int id, Scraper scraper)
        {
            if (id != scraper.ID)
            {
                return BadRequest();
            }

            _context.Entry(scraper).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScraperExists(id))
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

        // POST: api/Scrapers
        [HttpPost]
        public async Task<ActionResult<Scraper>> PostScraper(Scraper scraper)
        {
            _context.Scrapers.Add(scraper);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScraper", new { id = scraper.ID }, scraper);
        }

        // DELETE: api/Scrapers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScraper(int id)
        {
            var scraper = await _context.Scrapers.FindAsync(id);
            if (scraper == null)
            {
                return NotFound();
            }

            _context.Scrapers.Remove(scraper);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScraperExists(int id)
        {
            return _context.Scrapers.Any(e => e.ID == id);
        }


        //custom api request
        [HttpGet("GetForScrapdev/{name}")]
        public async Task<ActionResult<IEnumerable<Scraper>>> GetByNames(string name)
        {
            return await _context.Scrapers.Where(s => s.CreatedByName.Equals(name))
                .ToListAsync();
        }

        //[HttpGet("multiTest/")]
    }
}
