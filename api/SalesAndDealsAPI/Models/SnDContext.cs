using System;
using Microsoft.EntityFrameworkCore;


namespace SalesAndDealsAPI.Models
{
    public class SnDContext : DbContext
    {
        public SnDContext(DbContextOptions<SnDContext> options) : base(options)
        {
        }

        public DbSet<ScrapdevDTO> Scrapdevs { get; set; }
        public DbSet<Scraper> Scrapers { get; set; }

    }

}
