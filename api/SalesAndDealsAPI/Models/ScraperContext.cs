using Microsoft.EntityFrameworkCore;
using System;

namespace SalesAndDealsAPI.Models
{
    public class ScraperContext : DbContext
    {
        public ScraperContext(DbContextOptions<ScraperContext> options) : base(options)
        {
        }

        public DbSet<Scraper> Scrapers { get; set; }
    }
}
