using System;
using Microsoft.EntityFrameworkCore;
using SalesAndDealsAPI.Models;


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
        public DbSet<Result> Results { get; set; }
        public DbSet<ShopNotes> ShopNotes { get; set; }
        public DbSet<Tag> Tags { get; set; }

    }

}
