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
    public class UsersController : ControllerBase
    {
        private readonly SnDContext _context;

        public UsersController(SnDContext context)
        {
            _context = context;
        }

        // GET: api/Scrapdevs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScrapdevDTO>>> GetScrapdevs()
        {
            return await _context.Users.Select(s => new ScrapdevDTO(s.Id, s.Username, s.Role)).ToListAsync();
        }

        // GET: api/Scrapdevs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetScrapdev(int id)
        {
            var scrapdev = await _context.Users.FindAsync(id);

            if (scrapdev == null)
            {
                return NotFound();
            }

            return scrapdev;
        }


        // POST: api/Scrapdevs
        [HttpPost]
        public async Task<ActionResult<ScrapdevDTO>> PostScrapdev(User scrapdev)
        {
            _context.Users.Add(scrapdev);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScrapdev", new { id = scrapdev.Id }, scrapdev);
        }


        private bool ScrapdevExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        //custom endpoints, for learning

        [HttpGet("createdScrapers/{username}")]
        public async Task<ActionResult<ScrapDetails>> UserScrapsCounter(string Username)
        {
            var dev = await _context.Users.Where(s => s.Username.Equals(Username)).FirstAsync();
            var counter = await _context.Scrapers.Where(s => s.CreatedByName.Equals(Username)).CountAsync();
            return new ScrapDetails(dev, counter);
        }

    }
}
