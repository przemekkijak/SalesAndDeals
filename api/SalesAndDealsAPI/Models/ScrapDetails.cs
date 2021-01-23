using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class ScrapDetails
    {
        public User DevDetails { get; set; }
        public int ScrapersMadeCounter { get; set; }

        public ScrapDetails(User dev, int counter)
        {
            this.DevDetails = dev;
            this.ScrapersMadeCounter = counter;
        }
    }

}
