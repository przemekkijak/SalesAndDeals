using System;
using Microsoft.EntityFrameworkCore;


namespace SalesAndDealsAPI.Models
{
    public class ScrapdevContext : DbContext
    {
        public ScrapdevContext(DbContextOptions<ScrapdevContext> options) : base(options)
        {
        }

        public DbSet<ScrapdevDTO> Scrapdevs { get; set; }
    }
}
