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
    public class ShopNotesController : ControllerBase
    {
        private readonly SnDContext _context;

        public ShopNotesController(SnDContext context)
        {
            _context = context;
        }

        // GET: api/ShopNotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShopNotesDTO>>> GetShopNotes()
        {
            List<ShopNotes> notes = await _context.ShopNotes.ToListAsync();
            List<ShopNotesDTO> resultNotes = new List<ShopNotesDTO>();
            foreach(ShopNotes note in notes)
            {
                var shopData = await _context.Shops.Where(s => s.ShopId.Equals(note.ShopId)).FirstOrDefaultAsync();
                string countryCode = (string) await _context.Countries.Where(c => c.CountryId.Equals(shopData.CountryId)).Select(s => s.CountryCode).FirstOrDefaultAsync();
                ShopNotesDTO noteDTO = new ShopNotesDTO(note)
                {
                    Shop = $"{countryCode}/{shopData.Name}",
                    RobotState = shopData.RobotState,
                    AssignedTo = shopData.AssignedTo
                };
                resultNotes.Add(noteDTO);
            }
            return resultNotes;
        }

        [HttpGet("getNotesForShop/{id}")]
        public async Task<ActionResult<IEnumerable<ShopNotes>>> GetNotesForShop(int id)
        {
            return await _context.ShopNotes.Where(n => n.ShopId.Equals(id)).ToListAsync();
        }

        [HttpGet("getNote/{id}")]
        public async Task<ActionResult<ShopNotes>> GetNote(int id)
        {
            var result = await _context.ShopNotes.FindAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return result;
        }

        [HttpPost("addNote")]
        public async Task<ActionResult<ShopNotes>> PostNote(ShopNotes note)
        {
            _context.ShopNotes.Add(note);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetNote", new { id = note.Id }, note);
        }

        // DELETE: api/ShopNotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShopNotes(int id)
        {
            var shopNotes = await _context.ShopNotes.FindAsync(id);
            if (shopNotes == null)
            {
                return NotFound();
            }

            _context.ShopNotes.Remove(shopNotes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShopNotesExists(int id)
        {
            return _context.ShopNotes.Any(e => e.Id == id);
        }
    }
}
