using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SalesAndDealsAPI.Models;


namespace SalesAndDealsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExecutionsController : ControllerBase
    {
        private readonly SnDContext _context;

        public ExecutionsController(SnDContext context)
        {
            _context = context;
        }


        // GET: api/Executions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Executions>> GetExecutionsForShop(int id)
        {
            var executions = await _context.Executions.Where(e => e.ShopId.Equals(id)).FirstAsync();

            if (executions == null)
            {
                return NotFound();
            }

            return executions;
        }

        // PUT: api/Executions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExecutions(int id, Executions executions)
        {
            if (id != executions.ShopId)
            {
                return BadRequest();
            }

            _context.Entry(executions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExecutionsExists(id))
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

        //POST: api/Executions
       [HttpPost("{id}")]
        public async Task<ActionResult<Executions>> PostExecutions(int id)
        {
            string dexiRun = await _context.Shops.Where(s => s.Id.Equals(id)).Select(s => s.DexiRun).SingleOrDefaultAsync();
            HttpClient http = new HttpClient();
            http.DefaultRequestHeaders.Add("X-DexiIO-Access", DotNetEnv.Env.GetString("DEXIACCESS"));
            http.DefaultRequestHeaders.Add("X-DexiIO-Account", DotNetEnv.Env.GetString("DEXIACCOUNT"));
            http.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            string response = await http.GetAsync($"https://api.dexi.io/runs/{dexiRun}/executions?limit=1").Result.Content.ReadAsStringAsync();
            JObject res = JObject.Parse(response);
            
            string starts = (string)res.SelectToken("rows[0].starts");
            string finished = (string)res.SelectToken("rows[0].finished");
            string state = (string)res.SelectToken("rows[0].state");
            
            Executions executions = new Executions(id, starts, finished, state);
            _context.Executions.Add(executions);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExecutionsForShop", new { id = executions.ShopId }, executions);
        }



        private bool ExecutionsExists(int id)
        {
            return _context.Executions.Any(e => e.ShopId == id);
        }
    }
}
