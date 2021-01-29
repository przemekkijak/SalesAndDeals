using System;
using Microsoft.EntityFrameworkCore;


namespace SalesAndDealsAPI.Models
{
    public class SnDContext : DbContext
    {
        public SnDContext(DbContextOptions<SnDContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Shops> Shops { get; set; }
        public DbSet<Country> Countries { get; set; }

    }

}
